/**
 * Client-side Image Compression Utility
 * Compresses images before upload to reduce file sizes
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  maxSizeKB?: number;
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  width: number;
  height: number;
}

/**
 * Compress an image file
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise with compression result
 */
export const compressImage = async (
  file: File, 
  options: CompressionOptions = {}
): Promise<CompressionResult> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'jpeg',
    maxSizeKB = 500
  } = options;

  console.log('🗜️ Starting image compression...', {
    originalSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    options: { maxWidth, maxHeight, quality, format, maxSizeKB }
  });

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          
          if (width > height) {
            width = Math.min(maxWidth, width);
            height = width / aspectRatio;
          } else {
            height = Math.min(maxHeight, height);
            width = height * aspectRatio;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            // Check if we need further compression based on file size
            const compressedSizeKB = blob.size / 1024;
            let finalBlob = blob;

            if (compressedSizeKB > maxSizeKB) {
              // Further compress if still too large
              const newQuality = Math.max(0.1, quality * (maxSizeKB / compressedSizeKB));
              console.log(`📉 Further compressing... Quality: ${(newQuality * 100).toFixed(1)}%`);
              
              canvas.toBlob(
                (finalBlobCompressed) => {
                  if (!finalBlobCompressed) {
                    reject(new Error('Failed to further compress image'));
                    return;
                  }

                  const finalFile = new File([finalBlobCompressed], file.name, {
                    type: `image/${format}`,
                    lastModified: Date.now()
                  });

                  const result: CompressionResult = {
                    file: finalFile,
                    originalSize: file.size,
                    compressedSize: finalBlobCompressed.size,
                    compressionRatio: (1 - finalBlobCompressed.size / file.size) * 100,
                    width,
                    height
                  };

                  console.log('✅ Compression completed!', {
                    originalSize: `${(result.originalSize / 1024 / 1024).toFixed(2)} MB`,
                    compressedSize: `${(result.compressedSize / 1024 / 1024).toFixed(2)} MB`,
                    compressionRatio: `${result.compressionRatio.toFixed(1)}%`,
                    dimensions: `${result.width}x${result.height}`
                  });

                  resolve(result);
                },
                `image/${format}`,
                newQuality
              );
            } else {
              const finalFile = new File([blob], file.name, {
                type: `image/${format}`,
                lastModified: Date.now()
              });

              const result: CompressionResult = {
                file: finalFile,
                originalSize: file.size,
                compressedSize: blob.size,
                compressionRatio: (1 - blob.size / file.size) * 100,
                width,
                height
              };

              console.log('✅ Compression completed!', {
                originalSize: `${(result.originalSize / 1024 / 1024).toFixed(2)} MB`,
                compressedSize: `${(result.compressedSize / 1024 / 1024).toFixed(2)} MB`,
                compressionRatio: `${result.compressionRatio.toFixed(1)}%`,
                dimensions: `${result.width}x${result.height}`
              });

              resolve(result);
            }
          },
          `image/${format}`,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Smart compression that automatically adjusts quality based on file size
 * @param file - The image file to compress
 * @param targetSizeKB - Target file size in KB
 * @returns Promise with compression result
 */
export const smartCompress = async (
  file: File, 
  targetSizeKB: number = 500
): Promise<CompressionResult> => {
  console.log('🧠 Starting smart compression...', {
    originalSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    targetSize: `${targetSizeKB} KB`
  });

  // Start with high quality and reduce if needed
  let quality = 0.9;
  const maxAttempts = 5;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const result = await compressImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality,
        format: 'jpeg',
        maxSizeKB: targetSizeKB
      });

      // Check if we achieved the target size
      const resultSizeKB = result.compressedSize / 1024;
      
      if (resultSizeKB <= targetSizeKB * 1.1) { // 10% tolerance
        console.log(`✅ Smart compression successful on attempt ${attempt + 1}`);
        return result;
      }

      // Reduce quality for next attempt
      quality = Math.max(0.1, quality * 0.7);
      attempt++;
      
      console.log(`🔄 Attempt ${attempt + 1}: Reducing quality to ${(quality * 100).toFixed(1)}%`);
      
    } catch (error) {
      console.error(`❌ Compression attempt ${attempt + 1} failed:`, error);
      attempt++;
      quality = Math.max(0.1, quality * 0.7);
    }
  }

  // If all attempts failed, return the last result or original file
  try {
    return await compressImage(file, { quality: 0.1 });
  } catch (error) {
    console.warn('⚠️ All compression attempts failed, returning original file');
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
      compressionRatio: 0,
      width: 0,
      height: 0
    };
  }
};

/**
 * Check if an image needs compression
 * @param file - The image file to check
 * @param maxSizeKB - Maximum size threshold in KB
 * @returns True if compression is recommended
 */
export const needsCompression = (file: File, maxSizeKB: number = 500): boolean => {
  const sizeKB = file.size / 1024;
  return sizeKB > maxSizeKB;
};

/**
 * Get recommended compression options based on file size
 * @param file - The image file to analyze
 * @returns Recommended compression options
 */
export const getRecommendedOptions = (file: File): CompressionOptions => {
  const sizeMB = file.size / (1024 * 1024);
  
  if (sizeMB > 5) {
    return {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.6,
      format: 'jpeg',
      maxSizeKB: 300
    };
  } else if (sizeMB > 2) {
    return {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.7,
      format: 'jpeg',
      maxSizeKB: 400
    };
  } else if (sizeMB > 1) {
    return {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.8,
      format: 'jpeg',
      maxSizeKB: 500
    };
  } else {
    return {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.9,
      format: 'jpeg',
      maxSizeKB: 600
    };
  }
};
