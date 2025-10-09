import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp, DocumentData, QueryConstraint, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { uploadToCloudinary, deleteFromCloudinary, uploadFromUrl, isCloudinaryUrl, isFirebaseStorageUrl } from './cloudinary';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase is properly configured
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId && 
  firebaseConfig.storageBucket &&
  firebaseConfig.apiKey !== 'your-api-key' &&
  firebaseConfig.authDomain !== 'your-project.firebaseapp.com';

if (!isFirebaseConfigured) {
  console.warn('🔌 Firebase not configured. Using demo mode.');
  console.warn('📋 To connect to Firebase:');
  console.warn('   1. Create a Firebase project at https://console.firebase.google.com');
  console.warn('   2. Enable Firestore, Authentication, and Storage');
  console.warn('   3. Update the .env file with your credentials');
  console.warn('   4. Restart the development server');
  console.warn('📖 Check FIREBASE_SETUP.md for detailed instructions');
} else {
  console.log('✅ Firebase configuration detected, initializing...');
}

// Initialize Firebase
export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
export const storage = app ? getStorage(app) : null;

// For backward compatibility, export as supabase
export const supabase = {
  db,
  auth,
  storage
};

// Connection status check
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!db) return false;
  
  try {
    console.log('🔍 Testing Firebase connection...');
    
    // Try to read from products collection
    const productsRef = collection(db, 'products');
    const testQuery = query(productsRef, limit(1));
    await getDocs(testQuery);
    
    console.log('✅ Successfully connected to Firebase!');
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Firebase connection test failed:', errorMessage);
    return false;
  }
};

// Database types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  function_type: string | null;
  image_url: string;
  is_for_sale: boolean;
  created_at: string;
  updated_at: string;
}

export const categories = [
  'bridal collection',
  'necklace',
  'aharam',
  'earings',
  'bangles',
  'other accessories'
];

export const functions = [
  'birthday party',
  'kovil',
  'preshoot',
  'postshoot',
  'bridetobe',
  'mehindi'
];

// Convert Firestore document to Product
const documentToProduct = (doc: DocumentData): Product => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    function_type: data.function_type || null,
    image_url: data.image_url,
    is_for_sale: data.is_for_sale,
    created_at: data.created_at?.toDate?.()?.toISOString() || data.created_at,
    updated_at: data.updated_at?.toDate?.()?.toISOString() || data.updated_at
  };
};

// No demo data - fetch directly from Firebase

// Product count operations
export const getProductCounts = async (): Promise<{
  total: number;
  forSale: number;
  forRent: number;
  categories: number;
}> => {
  if (!db) {
    console.error('❌ Firebase not configured. Cannot fetch product counts.');
    throw new Error('Firebase database not initialized. Please check your configuration.');
  }

  try {
    console.log('📊 Fetching product counts from Firebase...');
    
    const productsRef = collection(db, 'products');
    
    // Get all products for counting
    const querySnapshot = await getDocs(query(productsRef));
    const allProducts = querySnapshot.docs.map(documentToProduct);
    
    const counts = {
      total: allProducts.length,
      forSale: allProducts.filter(p => p.is_for_sale).length,
      forRent: allProducts.filter(p => !p.is_for_sale).length,
      categories: new Set(allProducts.map(p => p.category)).size
    };
    
    console.log(`📊 Product counts:`, counts);
    return counts;
  } catch (error) {
    console.error('❌ Firebase count fetch failed:', error);
    throw new Error(`Failed to fetch product counts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Product operations
export const getProducts = async (
  category?: string,
  searchTerm?: string,
  showSalesOnly?: boolean
): Promise<Product[]> => {
  if (!db) {
    console.error('❌ Firebase not configured. Cannot fetch products.');
    throw new Error('Firebase database not initialized. Please check your configuration.');
  }

  try {
    console.log('🔥 Fetching products from Firebase...');
    console.log(`🔍 Filter parameters: category="${category}", search="${searchTerm}", salesOnly=${showSalesOnly}`);
    
    const productsRef = collection(db, 'products');
    const constraints: QueryConstraint[] = [];

    // Apply category filter (client-side for now to avoid index issues)
    // if (category && category !== 'all') {
    //   console.log(`🏷️ Adding category filter: ${category}`);
    //   constraints.push(where('category', '==', category));
    // }

    // Apply sales filter
    if (showSalesOnly) {
      console.log(`👁️ Adding rent-only filter`);
      constraints.push(where('is_for_sale', '==', false));
    }

    // Add ordering
    constraints.push(orderBy('created_at', 'desc'));

    const q = query(productsRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    let products = querySnapshot.docs.map(documentToProduct);
    console.log(`📦 Fetched ${products.length} products from Firebase`);

    // Apply category filter (client-side to avoid index issues)
    if (category && category !== 'all') {
      console.log(`🏷️ Applying category filter client-side: ${category}`);
      const beforeCount = products.length;
      products = products.filter(product => product.category === category);
      console.log(`🏷️ Category filter reduced results from ${beforeCount} to ${products.length}`);
    }

    // Apply search term filter (client-side since Firestore doesn't have full-text search)
    if (searchTerm && searchTerm.trim().length >= 3) {
      console.log(`🔍 Applying search filter: ${searchTerm}`);
      const searchLower = searchTerm.toLowerCase();
      const beforeCount = products.length;
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
      console.log(`🔍 Search reduced results from ${beforeCount} to ${products.length}`);
    }

    console.log(`✅ Returning ${products.length} filtered products`);
    return products;
  } catch (error) {
    console.error('❌ Firebase fetch failed:', error);
    throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Image storage operations - Using Cloudinary
export const uploadImageToStorage = async (file: File): Promise<string> => {
  console.log('📤 Uploading image to Cloudinary...');
  
  try {
    // Upload to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(file, 'products');
    console.log('✅ Image uploaded successfully to Cloudinary:', cloudinaryUrl);
    
    return cloudinaryUrl;
  } catch (error) {
    console.error('❌ Failed to upload image:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const deleteImageFromStorage = async (imageUrl: string): Promise<void> => {
  try {
    // Check if it's a Cloudinary URL
    if (isCloudinaryUrl(imageUrl)) {
      console.log('🗑️ Deleting from Cloudinary');
      await deleteFromCloudinary(imageUrl);
      return;
    }
    
    // Check if it's a Firebase Storage URL (for migration cleanup)
    if (storage && isFirebaseStorageUrl(imageUrl)) {
      console.log('🗑️ Deleting from Firebase Storage');
      
      // Extract the storage path from the URL
      const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/`;
      if (imageUrl.startsWith(baseUrl)) {
        const pathMatch = imageUrl.match(/\/o\/(.+?)\?/);
        if (pathMatch && pathMatch[1]) {
          const path = decodeURIComponent(pathMatch[1]);
          const storageRef = ref(storage, path);
          await deleteObject(storageRef);
          console.log('✅ Deleted from Firebase Storage');
          return;
        }
      }
    }
    
    console.log('ℹ️ Image not in cloud storage, skipping deletion');
  } catch (error) {
    console.error('⚠️ Error deleting image from storage:', error);
    // Don't throw - deletion errors shouldn't block other operations
  }
};

export const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  if (!db) {
    console.error('❌ Firebase not configured. Cannot add products.');
    throw new Error('Firebase database not initialized. Please check your configuration.');
  }

  // Check if user is authenticated
  if (!auth?.currentUser) {
    console.error('🔒 Authentication required to add products');
    throw new Error('You must be logged in to add products');
  }

  try {
    const productsRef = collection(db, 'products');
    const now = Timestamp.now();
    const productData = {
      ...product,
      created_at: now,
      updated_at: now
    };

    const docRef = await addDoc(productsRef, productData);
    const docSnapshot = await getDoc(docRef);
    
    return documentToProduct(docSnapshot);
  } catch (error) {
    console.error('❌ Database error adding product:', error);
    throw new Error(`Failed to add product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  if (!db) {
    console.error('❌ Firebase not configured. Cannot update products.');
    throw new Error('Firebase database not initialized. Please check your configuration.');
  }

  // Check if user is authenticated
  if (!auth?.currentUser) {
    console.error('🔒 Authentication required to update products');
    throw new Error('You must be logged in to update products');
  }

  try {
    const docRef = doc(db, 'products', id);
    const updateData = {
      ...updates,
      updated_at: Timestamp.now()
    };
    
    await updateDoc(docRef, updateData);
    
    const docSnapshot = await getDoc(docRef);
    return documentToProduct(docSnapshot);
  } catch (error) {
    console.error('❌ Database error updating product:', error);
    throw new Error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (!db) {
    console.error('❌ Firebase not configured. Cannot delete products.');
    throw new Error('Firebase database not initialized. Please check your configuration.');
  }

  // Check if user is authenticated
  if (!auth?.currentUser) {
    console.error('🔒 Authentication required to delete products');
    throw new Error('You must be logged in to delete products');
  }

  try {
    // Get the product to delete its image from storage
    const docRef = doc(db, 'products', id);
    const docSnapshot = await getDoc(docRef);
    
    if (docSnapshot.exists()) {
      const productData = docSnapshot.data();
      if (productData.image_url) {
        await deleteImageFromStorage(productData.image_url);
      }
    }

    await deleteDoc(docRef);
  } catch (error) {
    console.error('❌ Database error deleting product:', error);
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Auth operations
export const signUp = async (email: string, password: string) => {
  if (!auth) {
    // In demo mode, allow creating demo accounts
    console.info('🎭 Demo mode: Creating demo account');
    return {
      user: {
        uid: `demo-user-${Date.now()}`,
        email: email,
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString()
        }
      }
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    console.error('🔒 Signup error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  // Demo mode - bypass Firebase for demo credentials
  if (email === 'admin@rishvigems.com' && password === 'admin123') {
    console.info('🎭 Using demo credentials');
    return {
      user: {
        uid: 'demo-user',
        email: 'admin@rishvigems.com',
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString()
        }
      }
    };
  }

  if (!auth) {
    throw new Error('🔌 Database not connected. Use demo credentials: admin@rishvigems.com / admin123');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    console.error('🔒 Login error:', error);
    throw error;
  }
};

export const signOut = async () => {
  if (!auth) {
    console.info('🎭 Demo mode logout');
    return;
  }

  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('🔒 Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  if (!auth) {
    console.info('🎭 Demo mode - no user authentication');
    return null;
  }

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Auth state change listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
};
