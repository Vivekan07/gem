/*
  # Insert Sample Products

  1. Sample Data
    - Insert sample jewelry products to demonstrate the application
    - Mix of products for sale and rent-only items
    - Various categories and function types
    - Realistic pricing and descriptions

  2. Data Includes
    - Traditional necklaces and aharams
    - Bridal collection items
    - Earrings and bangles
    - Items for different occasions (kovil, bridetobe, etc.)
*/

-- Insert sample products
INSERT INTO products (name, description, price, category, function_type, image_url, is_for_sale) VALUES
(
  'Golden Temple Necklace',
  'Exquisite gold-plated temple jewelry necklace with intricate goddess motifs and traditional South Indian craftsmanship',
  15000.00,
  'necklace',
  'kovil',
  '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg',
  true
),
(
  'Diamond Bridal Set',
  'Complete bridal jewelry set with matching necklace, earrings, and bangles featuring premium diamonds and gold work',
  75000.00,
  'bridal collection',
  'bridetobe',
  '/WhatsApp Image 2025-09-29 at 16.43.13_9738fb2e copy copy.jpg',
  true
),
(
  'Traditional Aharam',
  'Long traditional South Indian aharam with semi-precious stones and intricate gold work, perfect for special occasions',
  25000.00,
  'aharam',
  'bridetobe',
  '/WhatsApp Image 2025-09-29 at 16.29.13_d36c45a7.jpg',
  false
),
(
  'Pearl Drop Earrings',
  'Elegant pearl drop earrings with gold accents and traditional design, suitable for parties and celebrations',
  8000.00,
  'earings',
  'birthday party',
  '/WhatsApp Image 2025-09-29 at 16.19.10_2ea69db4.jpg',
  true
),
(
  'Gold Bangles Set',
  'Set of 6 matching gold bangles with traditional designs and intricate patterns, perfect for photoshoots',
  18000.00,
  'bangles',
  'preshoot',
  '/WhatsApp Image 2025-09-29 at 17.01.23_d3b46a6b copy.jpg',
  false
),
(
  'Ruby Stone Necklace',
  'Stunning ruby stone necklace with gold chain and traditional South Indian design elements',
  35000.00,
  'necklace',
  'postshoot',
  '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg',
  true
),
(
  'Bridal Crown Set',
  'Complete bridal crown with matching accessories, featuring premium stones and gold work for the perfect bride',
  95000.00,
  'bridal collection',
  'bridetobe',
  '/WhatsApp Image 2025-09-29 at 16.43.13_9738fb2e copy copy.jpg',
  true
),
(
  'Antique Gold Aharam',
  'Vintage-style antique gold aharam with traditional motifs and heritage design, ideal for temple visits',
  45000.00,
  'aharam',
  'kovil',
  '/WhatsApp Image 2025-09-29 at 16.29.13_d36c45a7.jpg',
  false
);