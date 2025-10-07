import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit } from 'firebase/firestore';
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

// Check if environment variables are properly configured
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId && 
  firebaseConfig.storageBucket && 
  firebaseConfig.messagingSenderId && 
  firebaseConfig.appId &&
  firebaseConfig.apiKey !== 'your-api-key-here' &&
  firebaseConfig.authDomain !== 'your-project.firebaseapp.com';

if (!isFirebaseConfigured) {
  console.warn('🔌 Firebase not configured. Using demo mode.');
  console.warn('📋 To connect to Firebase:');
  console.warn('   1. Create a Firebase project at https://console.firebase.google.com');
  console.warn('   2. Update the .env file with your Firebase config');
  console.warn('   3. Enable Firestore, Storage, and Authentication');
  console.warn('   4. Restart the development server');
} else {
  console.log('✅ Firebase configuration detected, attempting connection...');
}

// Initialize Firebase
export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
export const storage = app ? getStorage(app) : null;

// Compatibility with supabase import
export const supabase = {
  auth: {
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      if (!auth) {
        callback('SIGNED_OUT', null);
        return { subscription: { unsubscribe: () => {} } };
      }
      
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          callback('SIGNED_IN', { user });
        } else {
          callback('SIGNED_OUT', null);
        }
      });
      
      return { subscription: { unsubscribe } };
    },
    getUser: async () => {
      if (!auth) return { data: { user: null } };
      return { data: { user: auth.currentUser } };
    },
    signOut: async () => {
      if (!auth) return { error: null };
      try {
        await firebaseSignOut(auth);
        return { error: null };
      } catch (error) {
        return { error };
      }
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      // Demo mode check
      if (credentials.email === 'admin@rishvigems.com' && credentials.password === 'admin123') {
        console.info('🎭 Using demo credentials');
        return {
          data: {
            user: {
              id: 'demo-user',
              email: 'admin@rishvigems.com'
            }
          },
          error: null
        };
      }

      if (!auth) {
        return { 
          data: null, 
          error: new Error('🔌 Database not connected. Use demo credentials: admin@rishvigems.com / admin123') 
        };
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        return {
          data: { user: userCredential.user },
          error: null
        };
      } catch (error) {
        return { data: null, error };
      }
    }
  }
};

// Connection status check (renamed for Firebase compatibility)
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!db) return false;
  
  try {
    console.log('🔍 Testing Firebase connection...');
    
    // Try to read from products collection
    const productsRef = collection(db, 'products');
    const q = query(productsRef, limit(1));
    await getDocs(q);
    
    console.log('✅ Successfully connected to Firebase database!');
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};

// Database types - matching the original Supabase interface
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

// Demo data for when Firebase is not available - using original structure
const demoProducts: Product[] = [
  {
    id: 'demo-1',
    name: 'Golden Temple Necklace',
    description: 'Exquisite gold-plated temple jewelry necklace with intricate goddess motifs',
    price: 15000,
    category: 'necklace',
    function_type: 'kovil',
    image_url: '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-2',
    name: 'Diamond Bridal Set',
    description: 'Complete bridal jewelry set with matching necklace, earrings, and bangles',
    price: 75000,
    category: 'bridal collection',
    function_type: 'bridetobe',
    image_url: '/WhatsApp Image 2025-09-29 at 16.43.38_68e91623.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-3',
    name: 'Traditional Aharam',
    description: 'Long traditional South Indian aharam with semi-precious stones',
    price: 25000,
    category: 'aharam',
    function_type: 'bridetobe',
    image_url: '/WhatsApp Image 2025-09-29 at 16.29.13_d36c45a7.jpg',
    is_for_sale: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-4',
    name: 'Pearl Drop Earrings',
    description: 'Elegant pearl drop earrings with gold accents',
    price: 8000,
    category: 'earings',
    function_type: 'birthday party',
    image_url: '/WhatsApp Image 2025-09-29 at 16.19.10_2ea69db4.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-5',
    name: 'Gold Bangles Set',
    description: 'Set of 6 matching gold bangles with traditional designs',
    price: 18000,
    category: 'bangles',
    function_type: 'preshoot',
    image_url: '/WhatsApp Image 2025-09-29 at 17.01.23_d3b46a6b.jpg',
    is_for_sale: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-6',
    name: 'Ruby Stone Necklace',
    description: 'Stunning ruby stone necklace with gold chain',
    price: 35000,
    category: 'necklace',
    function_type: 'postshoot',
    image_url: '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-7',
    name: 'Bridal Crown Set',
    description: 'Complete bridal crown with matching accessories',
    price: 95000,
    category: 'bridal collection',
    function_type: 'bridetobe',
    image_url: '/WhatsApp Image 2025-09-29 at 16.43.13_9738fb2e.jpg',
    is_for_sale: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-8',
    name: 'Emerald Earrings',
    description: 'Beautiful emerald earrings with gold setting',
    price: 12000,
    category: 'earings',
    function_type: 'mehindi',
    image_url: '/WhatsApp Image 2025-09-29 at 16.19.10_2ea69db4 copy.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Product operations
export const getProducts = async (
  category?: string,
  searchTerm?: string,
  showSalesOnly?: boolean
): Promise<Product[]> => {
  if (!db) {
    console.info('📊 Using demo data - Firebase not configured');
    let demoData = [...demoProducts];
    
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
    let constraints: any[] = [orderBy('created_at', 'desc'), limit(20)];

    // Apply category filter
    if (category && category !== 'all') {
      constraints.unshift(where('category', '==', category));
    }

    // Apply sales filter
    if (showSalesOnly) {
      constraints.unshift(where('is_for_sale', '==', false));
    }

    const q = query(productsRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    let products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    // Apply search term filter (client-side since Firestore has limited text search)
    if (searchTerm && searchTerm.trim().length >= 3) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return products;
  } catch (error) {
    console.warn('⚠️ Database connection failed, using demo data:', error);
    return demoProducts.filter(product => {
      let matches = true;
      if (category && category !== 'all') matches = matches && product.category === category;
      if (searchTerm) matches = matches && (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (showSalesOnly) matches = matches && !product.is_for_sale;
      return matches;
    });
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
    const productData = {
      ...product,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const docRef = await addDoc(productsRef, productData);
    
    return {
      id: docRef.id,
      ...productData
    } as Product;
  } catch (error) {
    console.error('🌐 Network error adding product:', error);
    throw new Error('Failed to add product. Please check your connection and try again.');
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
      image_url: updates.image_url || '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301.jpg',
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
    const productRef = doc(db, 'products', id);
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    await updateDoc(productRef, updateData);
    
    return {
      id,
      ...updates,
      updated_at: updateData.updated_at
    } as Product;
  } catch (error) {
    console.error('❌ Database error updating product:', error);
    throw new Error(`Failed to update product: ${error}`);
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
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error('❌ Database error deleting product:', error);
    throw new Error(`Failed to delete product: ${error}`);
  }
};

// Auth operations (maintain Supabase interface for compatibility)
export const signUp = async (email: string, password: string) => {
  if (!auth) {
    // In demo mode, allow creating demo accounts
    console.info('🎭 Demo mode: Creating demo account');
    return {
      user: {
        id: `demo-user-${Date.now()}`,
        email: email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      session: {
        access_token: 'demo-token',
        refresh_token: 'demo-refresh',
        expires_in: 3600,
        token_type: 'bearer',
        user: {
          id: `demo-user-${Date.now()}`,
          email: email
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
        id: 'demo-user',
        email: 'admin@rishvigems.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      session: {
        access_token: 'demo-token',
        refresh_token: 'demo-refresh',
        expires_in: 3600,
        token_type: 'bearer',
        user: {
          id: 'demo-user',
          email: 'admin@rishvigems.com'
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

export const getCurrentUser = async () => {
  if (!auth) {
    console.info('🎭 Demo mode - no user authentication');
    return null;
  }

  return auth.currentUser;
};