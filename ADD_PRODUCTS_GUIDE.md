# 📿 Adding New Products Guide

## Quick Start

Your jewelry shop application is now ready to accept new products! The old demo products have been removed, and you can start fresh with your own collection.

## How to Add New Products

### Method 1: Through Admin Panel (Recommended)

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Access Admin Panel:**
   - Open http://localhost:5173 in your browser
   - Click "Admin Login" button
   - Use credentials:
     - Email: `admin@rishvigems.com`
     - Password: `admin123`

3. **Switch to Admin View:**
   - Click the "Admin" tab in the header
   - Click "Add New Product" button

4. **Fill Product Details:**
   - **Product Name**: Give your jewelry a catchy name
   - **Description**: Detailed description of the piece
   - **Price**: Enter price in rupees (numbers only)
   - **Category**: Choose from:
     - `necklace` - Necklaces
     - `aharam` - Traditional long necklaces  
     - `earings` - All types of earrings
     - `bangles` - Bangles and bracelets
     - `bridal collection` - Complete bridal sets
   - **Function Type** (Optional):
     - `birthday party` - For birthday celebrations
     - `kovil` - For temple visits
     - `preshoot` - For pre-wedding shoots
     - `postshoot` - For post-wedding shoots
     - `bridetobe` - For bride-to-be events
     - `mehindi` - For mehindi ceremonies
   - **Image**: Upload a high-quality image (JPG/PNG, max 10MB)
   - **Availability**: 
     - ✅ "For Sale" - Can be purchased
     - ❌ "Rent Only" - Only available for rent

5. **Save Product:**
   - Click "Add Product" button
   - Product will be immediately visible in customer view

### Method 2: Add Images to Public Folder

If you want to use images already on your computer:

1. **Copy your product images to the `public` folder**
2. **Name them clearly** (e.g., `gold-necklace-1.jpg`)
3. **When adding products through admin panel**, use the path `/your-image-name.jpg`

## Image Guidelines

### Recommended Image Specifications:
- **Format**: JPG or PNG
- **Resolution**: At least 800x800px (square preferred)
- **File Size**: Under 5MB for best performance
- **Background**: Clean, preferably white or neutral
- **Lighting**: Well-lit to show jewelry details

### Image Naming Convention:
```
category-type-number.jpg
Examples:
- necklace-gold-temple-1.jpg
- earrings-pearl-drop-1.jpg  
- bangles-traditional-set-1.jpg
- bridal-complete-set-1.jpg
```

## Product Categories Explained

| Category | Description | Examples |
|----------|-------------|----------|
| **necklace** | All types of necklaces | Temple jewelry, gold chains, pendant sets |
| **aharam** | Traditional South Indian long necklaces | Long gold chains, traditional designs |
| **earings** | All earring types | Studs, drops, chandbali, jhumkas |
| **bangles** | Bangles and bracelets | Gold bangles, silver bangles, sets |
| **bridal collection** | Complete bridal sets | Full wedding jewelry sets |

## Function Types Explained

| Function Type | When to Use | Description |
|---------------|-------------|-------------|
| **birthday party** | Birthday celebrations | Light, elegant pieces |
| **kovil** | Temple visits | Traditional, spiritual designs |
| **preshoot** | Pre-wedding shoots | Photogenic, statement pieces |
| **postshoot** | Post-wedding shoots | Elegant, sophisticated designs |
| **bridetobe** | Bride-to-be events | Special occasion jewelry |
| **mehindi** | Mehindi ceremonies | Colorful, festive pieces |

## Managing Your Inventory

### For Sale vs Rent Only
- **For Sale**: Customer can purchase the item
- **Rent Only**: Item is only available for rental/borrowing

### Editing Products
1. Go to Admin Panel
2. Find the product in the list
3. Click "Edit" button  
4. Make changes
5. Click "Update Product"

### Deleting Products
1. Go to Admin Panel
2. Find the product in the list
3. Click "Delete" button
4. Confirm deletion

## Customer Experience

Once you add products, customers will see:
- ✨ Beautiful product gallery
- 🔍 Search functionality
- 📱 Mobile-responsive design
- 🏷️ Category filtering
- 💍 Function-based filtering
- 🖼️ Full-screen image viewing

## Tips for Success

### Photography Tips:
1. **Use natural light** when possible
2. **Multiple angles** - take 3-4 photos per piece
3. **Show details** - close-ups of intricate work
4. **Consistent background** for professional look
5. **Models wearing jewelry** can increase appeal

### Writing Descriptions:
1. **Be specific** - mention materials, stones, techniques
2. **Tell a story** - occasion, inspiration, craftsmanship
3. **Include measurements** - length, width, weight
4. **Mention care instructions** if needed
5. **Highlight unique features** - handcrafted, antique, etc.

### Pricing Strategy:
1. **Research market prices** for similar items
2. **Consider material costs** - gold, silver, stones
3. **Factor in craftsmanship** time and skill
4. **Set rental prices** at 10-20% of sale price
5. **Offer bundle discounts** for bridal sets

## Example Product Entry

**Name**: "Antique Gold Temple Necklace with Ruby Stones"

**Description**: "Exquisite handcrafted temple jewelry necklace featuring traditional South Indian goddess motifs. Adorned with natural ruby stones and intricate gold work. Perfect for temple visits, weddings, and cultural ceremonies. Comes with matching earrings."

**Price**: 25000

**Category**: necklace

**Function Type**: kovil

**Image**: `/temple-necklace-ruby-1.jpg`

**For Sale**: Yes

## Ready to Start!

Your jewelry shop is now ready for your beautiful collection. Start adding products through the admin panel and watch your online gallery come to life!

**Remember**: The demo login credentials work even without Firebase setup, so you can start adding products immediately.

**Need Help?** 
- Check the browser console for any error messages
- Ensure images are properly formatted and sized
- Test on different devices to ensure responsive design