/*
  # Remove hip belt category

  1. Changes
    - Remove 'hip belt' from the products category constraint
    - Update constraint to only allow: necklace, aharam, earings, bangles, bridal collection

  2. Security
    - No changes to RLS policies needed
*/

-- Drop the existing constraint
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;

-- Add the updated constraint without 'hip belt'
ALTER TABLE products ADD CONSTRAINT products_category_check 
  CHECK (category = ANY (ARRAY['necklace'::text, 'aharam'::text, 'earings'::text, 'bangles'::text, 'bridal collection'::text]));