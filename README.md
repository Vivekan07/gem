# Rishwi Gem Stone Gallery

A beautiful, modern jewelry showcase website built with React, TypeScript, and Firebase.

## 🚀 Quick Start

### Option 1: Demo Mode (No Setup Required)
The application works immediately with demo data. Just run:

```bash
npm install
npm run dev
```

**Demo Admin Credentials:**
- Email: `admin@rishvigems.com`
- Password: `admin123`

### Option 2: Connect to Firebase Database

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project name: `rishwi-gems-gallery`
4. Choose whether to enable Google Analytics (optional)
5. Wait for project creation to complete

#### Step 2: Enable Required Services
1. **Firestore Database**: Go to Firestore Database → Create database → Start in production mode
2. **Authentication**: Go to Authentication → Sign-in method → Enable Email/Password
3. **Storage**: Go to Storage → Get started → Start in production mode

#### Step 3: Get Configuration Keys
1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" icon and register app
4. Copy the configuration values

#### Step 4: Configure Environment
1. Update the `.env` file in your project root:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

#### Step 5: Deploy Security Rules
1. **Firestore Rules**: Copy content from `firestore.rules` to Firestore Database → Rules → Publish
2. **Storage Rules**: Copy content from `storage.rules` to Storage → Rules → Publish

#### Step 6: Restart Development Server
```bash
npm run dev
```

📖 **For detailed setup instructions, see `FIREBASE_SETUP.md`**

## 🎯 Features

### Customer Features
- **Beautiful Product Gallery**: Browse jewelry with high-quality images
- **Advanced Filtering**: Filter by category, function type, and availability
- **Search Functionality**: Find products by name or description
- **Responsive Design**: Works perfectly on all devices
- **Image Modal**: Click any product image for full-screen view

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Image Upload**: Upload product images directly
- **Inventory Control**: Mark items as for sale or rent-only
- **Category Management**: Organize products by type and function
- **Real-time Updates**: Changes reflect immediately

### Categories
- Necklaces
- Aharams (Traditional long necklaces)
- Earrings
- Hip Belts
- Bangles
- Bridal Collections

### Function Types
- Birthday Party
- Kovil (Temple visits)
- Pre-shoot
- Post-shoot
- Bride-to-be
- Mehindi

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📱 Responsive Design

The application is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔒 Security Features

- **Firestore Security Rules**: Database-level access control
- **Authentication Required**: Admin features require login
- **Public Product Viewing**: Customers can browse without accounts
- **Secure Image Upload**: Images stored securely in Firebase Storage
- **Admin-Only Write Access**: Only authenticated admins can modify products

## 🎨 Design Features

- **Luxury Black & Gold Theme**: Premium jewelry store aesthetic
- **Smooth Animations**: Elegant transitions and hover effects
- **Modern UI Components**: Clean, professional interface
- **Accessibility**: Keyboard navigation and screen reader support

## 📊 Database Schema

### Products Collection (Firestore)
- `id`: Unique document identifier (auto-generated)
- `name`: Product name (string)
- `description`: Detailed description (string)
- `price`: Price in rupees (number)
- `category`: Product category (string) - necklace, aharam, earings, bangles, bridal collection
- `function_type`: Occasion type (string, optional) - kovil, birthday party, preshoot, etc.
- `image_url`: Product image URL (string)
- `is_for_sale`: Sale vs rent-only flag (boolean)
- `created_at`: Creation timestamp (Firestore timestamp)
- `updated_at`: Last update timestamp (Firestore timestamp)

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the project**:
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting provider

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (optional, works with demo data)

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional)
```

## 📝 License

This project is created for Rishwi Gem Stone Gallery. All rights reserved.

## 🤝 Support

For support or questions about setting up the database:
1. Check the Supabase documentation
2. Verify your environment variables
3. Ensure your Supabase project is active
4. Check the browser console for detailed error messages

The application includes comprehensive error handling and will fall back to demo mode if the database connection fails.

## 💿 Adding New Products

The application starts with an empty product catalog. To add your jewelry products:

1. **Start the application**: `npm run dev`
2. **Login as admin**: Use `admin@rishvigems.com` / `admin123`
3. **Switch to Admin view**: Click the "Admin" tab
4. **Add products**: Click "Add New Product" and fill in the details

📖 **For detailed instructions, see `ADD_PRODUCTS_GUIDE.md`**

### Quick Product Addition Tips:
- **Images**: Upload high-quality JPG/PNG images (max 10MB)
- **Categories**: necklace, aharam, earings, bangles, bridal collection
- **Function Types**: kovil, birthday party, preshoot, postshoot, bridetobe, mehindi
- **Pricing**: Enter amounts in rupees (numbers only)
- **Availability**: Mark as "For Sale" or "Rent Only"
