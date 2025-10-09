/**
 * Cloudinary Utility for Image Management
 * Handles upload, update, and delete operations with Cloudinary
 */

// Cloudinary configuration
const CLOUD_NAME = 'dsgi4fbqu';
const API_KEY = '764844758469865';
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

if (!API_SECRET) {
  console.warn('⚠️ Cloudinary API Secret not configured. Please add VITE_CLOUDINARY_API_SECRET to your .env file');
}

/**
 * Upload an image file to Cloudinary
 * @param file - The image file to upload
 * @param folder - Optional folder path (default: 'products')
 * @returns Promise with the uploaded image URL
 */
export const uploadToCloudinary = async (
  file: File, 
  folder: string = 'products'
): Promise<string> => {
  if (!API_SECRET) {
    throw new Error('Cloudinary API Secret not configured. Please add VITE_CLOUDINARY_API_SECRET to your .env file');
  }

  console.log('📤 Uploading to Cloudinary:', file.name, `(${(file.size / 1024 / 1024).toFixed(2)} MB)`);

  try {
    // Create FormData for upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Use unsigned preset
    formData.append('folder', folder);

    // Upload to Cloudinary
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Cloudinary upload error:', errorText);
      throw new Error(`Upload failed: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Upload successful!');
    console.log('📊 Upload stats:', {
      originalSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      format: result.format,
      bytes: result.bytes,
      cloudinarySize: `${(result.bytes / 1024 / 1024).toFixed(2)} MB`
    });

    if (!result.secure_url) {
      throw new Error('No secure URL returned from Cloudinary');
    }

    console.log('✅ Image uploaded successfully to Cloudinary:', result.secure_url);
    return result.secure_url;

  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Upload image from a URL (for migration purposes)
 * Uses Cloudinary's fetch upload feature to bypass CORS
 */
export const uploadFromUrl = async (
  imageUrl: string, 
  folder: string = 'products'
): Promise<string> => {
  try {
    console.log('📥 Uploading image from URL to Cloudinary:', imageUrl);

    // Method 1: Try Cloudinary's fetch upload feature (bypasses CORS)
    try {
      const formData = new FormData();
      formData.append('file', imageUrl); // Cloudinary will fetch the URL server-side
      formData.append('upload_preset', 'ml_default'); // Use unsigned preset
      formData.append('folder', folder);

      // Upload to Cloudinary using fetch upload
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Cloudinary fetch upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Upload successful via fetch!');
      console.log('📊 Migration upload stats:', {
        format: result.format,
        bytes: result.bytes,
        cloudinarySize: `${(result.bytes / 1024 / 1024).toFixed(2)} MB`
      });
      
      if (!result.secure_url) {
        throw new Error('No secure URL returned from Cloudinary');
      }

      console.log('✅ Image uploaded successfully to Cloudinary:', result.secure_url);
      return result.secure_url;

    } catch (fetchError) {
      console.log('⚠️ Fetch upload failed, trying alternative method...');
      
      // Method 2: Try direct fetch with CORS proxy
      return await uploadFromUrlWithProxy(imageUrl, folder);
    }

  } catch (error) {
    console.error('❌ Failed to migrate image:', imageUrl, error);
    throw error;
  }
};

/**
 * Alternative upload method using CORS proxy
 */
async function uploadFromUrlWithProxy(
  imageUrl: string, 
  folder: string = 'products'
): Promise<string> {
  console.log('📥 Using CORS proxy method...');
  
  try {
    // Use a CORS proxy to fetch the image
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch via proxy: ${response.statusText}`);
    }

    const blob = await response.blob();
    const filename = imageUrl.split('/').pop() || 'image.jpg';
    const file = new File([blob], filename, { type: blob.type });

    // Upload the file to Cloudinary
    return await uploadToCloudinary(file, folder);
    
  } catch (proxyError) {
    console.error('❌ Proxy method also failed:', proxyError);
    
    // Method 3: Manual download and upload
    console.log('📥 Trying manual download method...');
    return await uploadFromUrlManual(imageUrl, folder);
  }
}

/**
 * Manual download method (fallback)
 */
async function uploadFromUrlManual(
  imageUrl: string, 
  _folder: string = 'products'
): Promise<string> {
  // This is a fallback that creates a simple upload form
  // In practice, you might want to use a server-side solution
  
  throw new Error(`
    Migration failed due to CORS restrictions. 
    
    Solutions:
    1. Create upload preset 'ml_default' in Cloudinary Dashboard
    2. Or use server-side migration script
    3. Or temporarily disable CORS in Firebase Storage rules
    
    Original URL: ${imageUrl}
  `);
}

/**
 * Delete an image from Cloudinary
 * @param imageUrl - The Cloudinary image URL to delete
 */
export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
  if (!API_SECRET) {
    console.warn('Cloudinary API Secret not configured, skipping delete');
    return;
  }

  try {
    // Extract public ID from Cloudinary URL
    const publicId = extractPublicId(imageUrl);
    if (!publicId) {
      console.warn('Could not extract public ID from URL:', imageUrl);
      return;
    }

    console.log('🗑️ Deleting from Cloudinary:', publicId);

    // Generate signature for delete
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = await generateSignature({
      timestamp,
      public_id: publicId
    });

    // Delete from Cloudinary
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        signature,
        api_key: API_KEY,
        timestamp
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Failed to delete from Cloudinary:', errorText);
    } else {
      console.log('✅ Deleted from Cloudinary');
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

/**
 * Generate Cloudinary signature for secure uploads
 */
async function generateSignature(params: Record<string, any>): Promise<string> {
  if (!API_SECRET) {
    throw new Error('API Secret is required for signature generation');
  }

  // Sort parameters
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  // Create signature
  const signatureString = sortedParams + API_SECRET;
  
  // Hash the signature string (you'll need to implement this)
  // For now, we'll use a simple approach - in production, use proper hashing
  const signature = await sha256(signatureString);
  return signature;
}

/**
 * Extract public ID from Cloudinary URL
 */
function extractPublicId(url: string): string | null {
  // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
  const match = url.match(/\/upload\/[^\/]+\/(.+)$/);
  return match ? match[1].replace(/\.[^/.]+$/, '') : null;
}

/**
 * Simple SHA256 implementation (for signature generation)
 * In production, use a proper crypto library
 */
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Check if URL is from Cloudinary
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('cloudinary.com');
};

/**
 * Check if URL is from Firebase Storage
 */
export const isFirebaseStorageUrl = (url: string): boolean => {
  return url.includes('firebasestorage.googleapis.com') || url.includes('firebase');
};
