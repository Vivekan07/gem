/**
 * Migration Utility: Firebase Storage to Cloudinary
 * 
 * This utility migrates existing Firebase Storage images to Cloudinary
 * and updates the Firestore products with new Cloudinary URLs.
 * 
 * Usage:
 * 1. Open browser console (F12)
 * 2. Run: migrateAllToCloudinary() - Migrate all products
 * 3. Or run: testCloudinaryMigration() - Test with one product
 */

import { db } from '../lib/supabase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { uploadFromUrl, isFirebaseStorageUrl } from '../lib/cloudinary';

interface Product {
  id: string;
  name: string;
  image_url: string;
  old_firebase_url?: string;
  [key: string]: any;
}

/**
 * Migrate a single product's image from Firebase Storage to Cloudinary
 */
export async function migrateProductToCloudinary(product: Product): Promise<string | null> {
  // Determine which Firebase Storage URL to migrate
  let firebaseUrl = null;
  
  if (product.old_firebase_url && isFirebaseStorageUrl(product.old_firebase_url)) {
    firebaseUrl = product.old_firebase_url;
  } else if (product.image_url && isFirebaseStorageUrl(product.image_url)) {
    firebaseUrl = product.image_url;
  }
  
  if (!firebaseUrl) {
    console.log(`⏭️ Skipping ${product.name} - no Firebase Storage URL found`);
    return null;
  }

  try {
    console.log(`\n🔄 Migrating: ${product.name}`);
    console.log(`  Current image_url: ${product.image_url}`);
    console.log(`  Firebase URL to migrate: ${firebaseUrl}`);

    // Upload to Cloudinary using the Firebase Storage URL
    const cloudinaryUrl = await uploadFromUrl(firebaseUrl, 'products');
    console.log(`  ✅ Cloudinary URL: ${cloudinaryUrl}`);

    // Update Firestore
    if (db) {
      console.log(`  💾 Updating Firestore...`);
      const productRef = doc(db, 'products', product.id);
      // Prepare update data
      const updateData: any = {
        image_url: cloudinaryUrl,
        migrated_to_cloudinary_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // If we migrated from image_url (not old_firebase_url), save the original URL
      if (firebaseUrl === product.image_url && firebaseUrl !== product.old_firebase_url) {
        updateData.old_firebase_url = firebaseUrl;
      }

      await updateDoc(productRef, updateData);
      console.log(`  ✅ Updated Firestore`);
    }

    return cloudinaryUrl;
  } catch (error) {
    console.error(`  ❌ Migration failed for ${product.name}:`, error);
    throw error;
  }
}

/**
 * Migrate all products from Firebase Storage to Cloudinary
 */
export async function migrateAllToCloudinary(): Promise<{
  total: number;
  migrated: number;
  skipped: number;
  failed: number;
  errors: Array<{ product: string; error: string }>;
}> {
  console.log('🚀 Starting migration from Firebase Storage to Cloudinary\n');

  if (!db) {
    throw new Error('❌ Firebase not initialized');
  }

  const results = {
    total: 0,
    migrated: 0,
    skipped: 0,
    failed: 0,
    errors: [] as Array<{ product: string; error: string }>,
  };

  try {
    // Fetch all products
    console.log('📊 Fetching products from Firestore...');
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);

    const products: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });

    results.total = products.length;
    console.log(`✅ Found ${products.length} products\n`);

    // Filter products that need migration
    const productsToMigrate = products.filter((p) => {
      // Check if either old_firebase_url OR image_url contains Firebase Storage URL
      // and the current image_url is not already Cloudinary
      const hasFirebaseUrl = (p.old_firebase_url && isFirebaseStorageUrl(p.old_firebase_url)) ||
                           (p.image_url && isFirebaseStorageUrl(p.image_url));
      
      return hasFirebaseUrl && !p.image_url.includes('cloudinary.com');
    });
    
    console.log(`🔄 ${productsToMigrate.length} products need migration\n`);

    if (productsToMigrate.length === 0) {
      console.log('✨ No products to migrate!');
      return results;
    }

    // Migrate each product
    for (let i = 0; i < productsToMigrate.length; i++) {
      const product = productsToMigrate[i];
      console.log(`\n[${i + 1}/${productsToMigrate.length}] Processing: ${product.name}`);

      try {
        await migrateProductToCloudinary(product);
        results.migrated++;
        console.log(`  ✅ Success!`);

        // Add delay to avoid rate limiting
        if (i < productsToMigrate.length - 1) {
          console.log('  ⏳ Waiting 2 seconds...');
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (error) {
        results.failed++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.errors.push({ product: product.name, error: errorMessage });
        console.error(`  ❌ Failed: ${errorMessage}`);
        // Continue with next product
      }
    }

    results.skipped = results.total - productsToMigrate.length;

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`📦 Total products: ${results.total}`);
    console.log(`✅ Successfully migrated: ${results.migrated}`);
    console.log(`⏭️ Skipped (already migrated): ${results.skipped}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log('='.repeat(60));

    if (results.errors.length > 0) {
      console.log('\n❌ Errors:');
      results.errors.forEach(({ product, error }) => {
        console.log(`  - ${product}: ${error}`);
      });
    }

    if (results.migrated > 0) {
      console.log('\n🎉 Migration completed!');
      console.log('💡 Old Firebase URLs are preserved in "old_firebase_url" field.');
      console.log('🔄 New Cloudinary URLs are in "image_url" field.');
    }

    return results;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

/**
 * Test migration with a single product
 */
export async function testCloudinaryMigration(): Promise<void> {
  console.log('🧪 Testing Cloudinary migration with one product...\n');

  if (!db) {
    throw new Error('❌ Firebase not initialized');
  }

  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);

    let testProduct: Product | undefined = undefined;

    querySnapshot.forEach((docSnap) => {
      const product = { id: docSnap.id, ...docSnap.data() } as Product;
      
      // Check if product has Firebase Storage URL in either field
      const hasFirebaseUrl = (product.old_firebase_url && isFirebaseStorageUrl(product.old_firebase_url)) ||
                           (product.image_url && isFirebaseStorageUrl(product.image_url));
      
      if (hasFirebaseUrl && !testProduct) {
        testProduct = product;
      }
    });

    if (!testProduct) {
      console.log('✨ No Firebase Storage images found to test');
      return;
    }

    // TypeScript type assertion after null check
    const productToMigrate: Product = testProduct;
    console.log(`🎯 Testing with: ${productToMigrate.name}`);
    await migrateProductToCloudinary(productToMigrate);
    console.log('\n✅ Test migration successful!');
  } catch (error) {
    console.error('❌ Test migration failed:', error);
    throw error;
  }
}

/**
 * Check migration status
 */
export async function checkMigrationStatus(): Promise<void> {
  console.log('🔍 Checking migration status...\n');

  if (!db) {
    throw new Error('❌ Firebase not initialized');
  }

  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);

    let totalProducts = 0;
    let cloudinaryProducts = 0;
    let firebaseProducts = 0;
    let otherProducts = 0;

    querySnapshot.forEach((docSnap) => {
      const product = { id: docSnap.id, ...docSnap.data() } as Product;
      totalProducts++;

      if (product.image_url?.includes('cloudinary.com')) {
        cloudinaryProducts++;
      } else if ((product.old_firebase_url && isFirebaseStorageUrl(product.old_firebase_url)) ||
                 (product.image_url && isFirebaseStorageUrl(product.image_url))) {
        firebaseProducts++;
      } else {
        otherProducts++;
      }
    });

    console.log('📊 Migration Status:');
    console.log(`📦 Total products: ${totalProducts}`);
    console.log(`☁️ Cloudinary images: ${cloudinaryProducts}`);
    console.log(`🔥 Firebase images: ${firebaseProducts}`);
    console.log(`🔗 Other/External URLs: ${otherProducts}`);
    
    if (firebaseProducts > 0) {
      console.log(`\n🔄 ${firebaseProducts} products still need migration`);
    } else {
      console.log(`\n✅ All products migrated to Cloudinary!`);
    }
  } catch (error) {
    console.error('❌ Status check failed:', error);
    throw error;
  }
}

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  (window as any).migrateAllToCloudinary = migrateAllToCloudinary;
  (window as any).testCloudinaryMigration = testCloudinaryMigration;
  (window as any).checkMigrationStatus = checkMigrationStatus;
  console.log('🔧 Cloudinary migration utilities loaded! Available commands:');
  console.log('  - testCloudinaryMigration() - Test with one product');
  console.log('  - migrateAllToCloudinary() - Migrate all products');
  console.log('  - checkMigrationStatus() - Check current status');
}
