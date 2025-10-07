# 🚀 Supabase Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Sign up/Sign in with GitHub, Google, or email
4. Create a new organization (if needed)
5. Click "New Project"
6. Fill in:
   - **Name**: `rishwi-gems-gallery`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your location
7. Click "Create new project"
8. Wait 2-3 minutes for setup to complete

## Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## Step 4: Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL code:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  category text NOT NULL CHECK (category = ANY (ARRAY['necklace', 'aharam', 'earings', 'hip belt', 'bangles', 'bridal collection'])),
  function_type text CHECK (function_type = ANY (ARRAY['birthday party', 'kovil', 'preshoot', 'postshoot', 'bridetobe', 'mehindi']) OR function_type IS NULL),
  image_url text NOT NULL,
  is_for_sale boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Authenticated users can manage products" 
  ON products FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_function_type ON products (function_type);
CREATE INDEX IF NOT EXISTS idx_products_is_for_sale ON products (is_for_sale);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable pg_trgm extension for fast text searching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create GIN index for fast text searches on name and description
CREATE INDEX IF NOT EXISTS trgm_idx_products_name_description 
  ON products USING GIN (name gin_trgm_ops, description gin_trgm_ops);
```

4. Click "Run" to execute the SQL

## Step 5: Add Sample Data (Optional)

Run this SQL to add sample jewelry products:

```sql
INSERT INTO products (name, description, price, category, function_type, image_url, is_for_sale) VALUES
('Golden Temple Necklace', 'Exquisite gold-plated temple jewelry necklace with intricate goddess motifs', 15000, 'necklace', 'kovil', '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg', true),
('Diamond Bridal Set', 'Complete bridal jewelry set with matching necklace, earrings, and bangles', 75000, 'bridal collection', 'bridetobe', '/WhatsApp Image 2025-09-29 at 16.43.13_9738fb2e copy copy.jpg', true),
('Traditional Aharam', 'Long traditional South Indian aharam with semi-precious stones', 25000, 'aharam', 'bridetobe', '/WhatsApp Image 2025-09-29 at 16.29.13_d36c45a7.jpg', false),
('Pearl Drop Earrings', 'Elegant pearl drop earrings with gold accents', 8000, 'earings', 'birthday party', '/WhatsApp Image 2025-09-29 at 16.19.10_2ea69db4.jpg', true),
('Gold Bangles Set', 'Set of 6 matching gold bangles with traditional designs', 18000, 'bangles', 'preshoot', '/WhatsApp Image 2025-09-29 at 17.01.23_d3b46a6b copy.jpg', false),
('Ruby Stone Necklace', 'Stunning ruby stone necklace with gold chain', 35000, 'necklace', 'postshoot', '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg', true);
```

## Step 6: Set Up Authentication (Optional)

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under "Site URL", add: `http://localhost:5173`
3. Under "Redirect URLs", add: `http://localhost:5173`
4. Disable "Enable email confirmations" for easier testing
5. Click "Save"

## Step 7: Set Up Storage (Optional)

1. Go to **Storage** in your Supabase dashboard
2. Click "New bucket"
3. Name it `product-images`
4. Make it **Public**
5. Click "Create bucket"

## Step 8: Test Connection

1. Save your `.env` file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Check the browser console - you should see:
   - ✅ "Connected to Supabase database"
   - No more "Demo mode" messages

## 🔧 Troubleshooting

### Connection Issues:
- ✅ Double-check your URL and API key
- ✅ Make sure there are no extra spaces in `.env`
- ✅ Restart the dev server after changing `.env`
- ✅ Check browser console for specific error messages

### Database Issues:
- ✅ Make sure you ran the SQL setup commands
- ✅ Check that RLS policies are created
- ✅ Verify the products table exists

### Authentication Issues:
- ✅ Add your localhost URL to Supabase Auth settings
- ✅ Disable email confirmations for testing
- ✅ Check that policies allow authenticated users

## 📞 Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active (not paused)
3. Make sure your API keys are correct
4. Try creating a new Supabase project if needed

The app will automatically detect when Supabase is connected and switch from demo mode to live database mode!