import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp, DocumentData, QueryConstraint, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

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
  'bangles'
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

// Demo data for fallback - Starting with empty product list
// You can add new products through the admin panel
const getDemoData = (): Product[] => [
  // Empty array - add your new products through the admin panel
  // Example product structure (remove this comment when adding real products):
  /*
  {
    id: 'product-1',
    name: 'Your Product Name',
    description: 'Your product description',
    price: 0,
    category: 'necklace', // or 'aharam', 'earings', 'bangles', 'bridal collection'
    function_type: 'kovil', // or 'birthday party', 'preshoot', 'postshoot', 'bridetobe', 'mehindi'
    image_url: '/path/to/your/image.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  */
];

// Product operations
export const getProducts = async (
  category?: string,
  searchTerm?: string,
  showSalesOnly?: boolean
): Promise<Product[]> => {
  if (!db) {
    console.info('📊 Using demo data - Firebase not configured');
    let demoData = getDemoData();
    
    // Apply demo filtering
    if (category && category !== 'all') {
      demoData = demoData.filter(product => product.category === category);
    }
    if (searchTerm) {
      demoData = demoData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (showSalesOnly) {
      demoData = demoData.filter(product => !product.is_for_sale);
    }
    
    return demoData;
  }

  try {
    const productsRef = collection(db, 'products');
    const constraints: QueryConstraint[] = [];

    // Apply category filter
    if (category && category !== 'all') {
      constraints.push(where('category', '==', category));
    }

    // Apply sales filter
    if (showSalesOnly) {
      constraints.push(where('is_for_sale', '==', false));
    }

    // Add ordering and limit
    constraints.push(orderBy('created_at', 'desc'));
    constraints.push(limit(20));

    const q = query(productsRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    let products = querySnapshot.docs.map(documentToProduct);

    // Apply search term filter (client-side since Firestore doesn't have full-text search)
    if (searchTerm && searchTerm.trim().length >= 3) {
      const searchLower = searchTerm.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    return products;
  } catch (error) {
    console.warn('⚠️ Database connection failed, using demo data:', error);
    return getDemoData();
  }
};

// Image storage operations
export const uploadImageToStorage = async (file: File): Promise<string> => {
  if (!storage) {
    console.warn('📁 Image upload not available - using default image');
    return '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg';
  }

  try {
    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload file to Firebase Storage
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('📁 Image upload failed, using default:', error);
    return '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg';
  }
};

export const deleteImageFromStorage = async (imageUrl: string): Promise<void> => {
  if (!storage || !imageUrl.includes('firebase')) {
    return; // Skip if not a Firebase storage URL
  }

  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image from storage:', error);
  }
};

export const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  if (!db) {
    console.warn('📝 Demo mode: Cannot save to database');
    const mockProduct: Product = {
      id: `demo-${Date.now()}`,
      ...product,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProduct;
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
    console.warn('📝 Demo mode: Cannot update database');
    const mockProduct: Product = {
      id,
      name: updates.name || 'Updated Product',
      description: updates.description || 'Updated description',
      price: updates.price || 0,
      category: updates.category || 'necklace',
      function_type: updates.function_type || null,
      image_url: updates.image_url || 'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg',
      is_for_sale: updates.is_for_sale !== undefined ? updates.is_for_sale : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    return mockProduct;
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
    console.warn('📝 Demo mode: Cannot delete from database');
    console.log('Demo mode: Product deleted:', id);
    return;
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
