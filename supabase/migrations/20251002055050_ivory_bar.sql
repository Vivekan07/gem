/*
  # Optimize text search performance

  1. Extensions
    - Enable `pg_trgm` extension for trigram-based text searching
  
  2. Indexes
    - Add GIN index on `name` and `description` columns for fast text searches
    - This will significantly improve performance of ILIKE operations
  
  3. Performance Impact
    - Prevents query timeouts on text-based searches
    - Enables efficient full-text search capabilities
*/

-- Enable pg_trgm extension for fast text searching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN index for fast text searches on name and description
CREATE INDEX IF NOT EXISTS trgm_idx_products_name_description 
  ON products USING GIN (name gin_trgm_ops, description gin_trgm_ops);