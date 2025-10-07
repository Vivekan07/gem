/*
  # Rishvi Gem Stone Gallery Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text, not null) - Name of the jewelry piece
      - `description` (text, not null) - Detailed description of the product
      - `price` (decimal, not null) - Price of the jewelry
      - `category` (text, not null) - Category (necklace, aharam, earings, etc.)
      - `function_type` (text, nullable) - Function type (birthday party, kovil, etc.)
      - `image_url` (text, not null) - URL of the product image
      - `is_for_sale` (boolean, default true) - Whether item is for sale or showcase only
      - `created_at` (timestamp) - When the product was added
      - `updated_at` (timestamp) - Last update time

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (customers can view all products)
    - Add policy for authenticated admin users to manage products
    - Add constraint to ensure valid categories and function types

  3. Indexes
    - Add indexes on category and function_type for faster filtering
    - Add index on is_for_sale for sales showcase filtering
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  category text NOT NULL CHECK (category IN ('necklace', 'aharam', 'earings', 'hip belt', 'bangles', 'bridal collection')),
  function_type text CHECK (function_type IN ('birthday party', 'kovil', 'preshoot', 'postshoot', 'bridetobe', 'mehindi') OR function_type IS NULL),
  image_url text NOT NULL,
  is_for_sale boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access (customers can view all products)
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert, update, and delete (admin functionality)
CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_function_type ON products(function_type);
CREATE INDEX IF NOT EXISTS idx_products_is_for_sale ON products(is_for_sale);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update the updated_at column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_products_updated_at'
  ) THEN
    CREATE TRIGGER update_products_updated_at
      BEFORE UPDATE ON products
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert sample data for testing
INSERT INTO products (name, description, price, category, function_type, image_url, is_for_sale) VALUES
  ('Golden Temple Necklace', 'Exquisite gold-plated temple jewelry necklace with intricate goddess motifs', 15000.00, 'necklace', 'kovil', 'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg', true),
  ('Diamond Bridal Set', 'Complete bridal jewelry set with matching necklace, earrings, and bangles', 75000.00, 'bridal collection', 'bridetobe', 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg', true),
  ('Traditional Aharam', 'Long traditional South Indian aharam with semi-precious stones', 25000.00, 'aharam', 'bridetobe', 'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg', false),
  ('Kundan Earrings', 'Beautiful kundan earrings perfect for special occasions', 8000.00, 'earings', 'birthday party', 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg', true),
  ('Designer Hip Belt', 'Elegant designer hip belt with traditional motifs', 12000.00, 'hip belt', 'preshoot', 'https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg', true),
  ('Gold Bangles Set', 'Set of 6 matching gold bangles with delicate engravings', 18000.00, 'bangles', 'mehindi', 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg', true);