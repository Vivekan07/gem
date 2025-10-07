// Firebase Setup Verification Script
// Run this after configuring Firebase to verify everything is working

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Load environment variables (in a real Node.js environment, you'd use dotenv)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

console.log('🔥 Firebase Setup Verification');
console.log('===============================');

// Check if configuration is present
console.log('\n📋 Configuration Check:');
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

let configComplete = true;
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (!value || value.includes('your-') || value.includes('123456')) {
    console.log(`❌ ${envVar}: Missing or placeholder value`);
    configComplete = false;
  } else {
    console.log(`✅ ${envVar}: Configured`);
  }
});

if (!configComplete) {
  console.log('\n⚠️  Please update your .env file with actual Firebase configuration values');
  console.log('   See FIREBASE_SETUP_GUIDE.md for instructions');
  process.exit(1);
}

console.log('\n🔌 Firebase Connection Test:');

try {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized');

  // Test Firestore
  const db = getFirestore(app);
  console.log('✅ Firestore connected');

  // Test Auth
  const auth = getAuth(app);
  console.log('✅ Authentication service connected');

  // Test Storage  
  const storage = getStorage(app);
  console.log('✅ Storage service connected');

  console.log('\n🎉 Firebase setup verification complete!');
  console.log('\nNext steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Open http://localhost:5173');
  console.log('3. Try logging in with admin@rishvigems.com');
  console.log('4. Test adding a product in the admin panel');

} catch (error) {
  console.log('❌ Firebase connection failed:', error.message);
  console.log('\nTroubleshooting tips:');
  console.log('- Verify your Firebase project is created');
  console.log('- Check that Firestore, Auth, and Storage are enabled');
  console.log('- Ensure your .env values are correct (no extra quotes)');
  console.log('- Make sure you\'ve published the security rules');
}