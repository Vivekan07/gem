// Initial Product Data Population Script
// Run this after Firebase is configured to add sample jewelry products

const sampleProducts = [
  {
    name: 'Golden Temple Necklace',
    description: 'Exquisite gold-plated temple jewelry necklace with intricate goddess motifs. Perfect for traditional ceremonies and special occasions.',
    price: 15000,
    category: 'necklace',
    function_type: 'kovil',
    image_url: '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Diamond Bridal Set',
    description: 'Complete bridal jewelry set with matching necklace, earrings, and bangles. Featuring high-quality diamonds and traditional craftsmanship.',
    price: 75000,
    category: 'bridal collection',
    function_type: 'bridetobe',
    image_url: '/WhatsApp Image 2025-09-29 at 16.43.38_68e91623.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Traditional Aharam',
    description: 'Long traditional South Indian aharam with semi-precious stones. Beautifully crafted for bridal ceremonies.',
    price: 25000,
    category: 'aharam',
    function_type: 'bridetobe',
    image_url: '/WhatsApp Image 2025-09-29 at 16.29.13_d36c45a7.jpg',
    is_for_sale: false, // Rent only
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Pearl Drop Earrings',
    description: 'Elegant pearl drop earrings with gold accents. Perfect for parties and special occasions.',
    price: 8000,
    category: 'earings',
    function_type: 'birthday party',
    image_url: '/WhatsApp Image 2025-09-29 at 16.19.10_2ea69db4.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Gold Bangles Set',
    description: 'Set of 6 matching gold bangles with traditional designs. Ideal for photoshoots and special events.',
    price: 18000,
    category: 'bangles',
    function_type: 'preshoot',
    image_url: '/WhatsApp Image 2025-09-29 at 17.01.23_d3b46a6b.jpg',
    is_for_sale: false, // Rent only
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Ruby Stone Necklace',
    description: 'Stunning ruby stone necklace with gold chain. A statement piece for any occasion.',
    price: 35000,
    category: 'necklace',
    function_type: 'postshoot',
    image_url: '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Bridal Crown Set',
    description: 'Complete bridal crown with matching accessories. Premium rental piece for wedding ceremonies.',
    price: 95000,
    category: 'bridal collection',
    function_type: 'bridetobe',
    image_url: '/WhatsApp Image 2025-09-29 at 16.43.13_9738fb2e.jpg',
    is_for_sale: false, // Rent only
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'Emerald Earrings',
    description: 'Beautiful emerald earrings with gold setting. Perfect for mehendi and traditional functions.',
    price: 12000,
    category: 'earings',
    function_type: 'mehindi',
    image_url: '/WhatsApp Image 2025-09-29 at 16.19.10_2ea69db4 copy.jpg',
    is_for_sale: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export { sampleProducts };

// Instructions for manual upload:
console.log('🔥 Rishwi Gems Gallery - Sample Products');
console.log('=========================================');
console.log('');
console.log('To populate your Firebase database with sample products:');
console.log('');
console.log('1. Complete Firebase setup (see FIREBASE_SETUP_GUIDE.md)');
console.log('2. Login to your admin panel at http://localhost:5173');
console.log('3. Use admin@rishvigems.com with your password');
console.log('4. Click "Add Product" and manually add these products:');
console.log('');

sampleProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name}`);
  console.log(`   Category: ${product.category}`);
  console.log(`   Price: ₹${product.price} ${product.is_for_sale ? '(For Sale)' : '(Rent Only)'}`);
  console.log(`   Function: ${product.function_type}`);
  console.log(`   Image: ${product.image_url}`);
  console.log('');
});

console.log('💡 Tip: All images are already copied to your public folder!');