# 🔥 Firebase Setup Guide for Rishwi Gems Gallery

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project name: `rishwi-gems-gallery`
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"
6. Wait for project creation to complete

## Step 2: Enable Required Services

### Enable Firestore Database
1. In Firebase console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode" (we have custom rules)
4. Select a location closest to your users
5. Click "Done"

### Enable Authentication
1. Go to **Authentication** → **Sign-in method**
2. Enable "Email/Password" provider
3. Click "Save"
4. (Optional) Add authorized domains if deploying

### Enable Storage
1. Go to **Storage**
2. Click "Get started"
3. Choose "Start in production mode" (we have custom rules)
4. Select same location as Firestore
5. Click "Done"

## Step 3: Get Configuration Keys

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web app" icon (`</>`)
4. Register app with name: `rishwi-gems-gallery`
5. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 4: Update Environment Variables

1. Open `.env` file in project root
2. Replace the placeholder values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Step 5: Deploy Security Rules

### Deploy Firestore Rules
1. In Firebase console, go to **Firestore Database** → **Rules**
2. Replace the existing rules with content from `firestore.rules`
3. Click "Publish"

### Deploy Storage Rules
1. Go to **Storage** → **Rules**
2. Replace the existing rules with content from `storage.rules`
3. Click "Publish"

## Step 6: Add Sample Data (Optional)

You can add sample jewelry products directly in Firebase console:

1. Go to **Firestore Database** → **Data**
2. Click "Start collection"
3. Collection ID: `products`
4. Add documents with this structure:

```json
{
  "name": "Golden Temple Necklace",
  "description": "Exquisite gold-plated temple jewelry necklace",
  "price": 15000,
  "category": "necklace",
  "function_type": "kovil",
  "image_url": "/path/to/image.jpg",
  "is_for_sale": true,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## Step 7: Test the Application

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Check browser console for connection status:
   - ✅ "Firebase configuration detected, initializing..."
   - ✅ "Successfully connected to Firebase!"

3. Test admin login with demo credentials:
   - Email: `admin@rishvigems.com`
   - Password: `admin123`

## 🎯 Features Enabled

### Customer Features
- ✅ Browse jewelry products
- ✅ Filter by category and function type
- ✅ Search products
- ✅ View product images
- ✅ Responsive design

### Admin Features
- ✅ Admin authentication
- ✅ Add new products
- ✅ Upload product images
- ✅ Edit existing products
- ✅ Delete products
- ✅ Real-time updates

## 🔒 Security Features

- **Firestore Rules**: Public read, admin-only write
- **Storage Rules**: Public image read, admin-only upload
- **Authentication**: Email/password with admin verification
- **Data Validation**: Schema validation in security rules

## 🚀 Deployment Options

### Option 1: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Option 2: Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Option 3: Vercel
1. Connect GitHub repository  
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables in Vercel dashboard

## 🔧 Troubleshooting

### Connection Issues
- ✅ Verify all environment variables are set correctly
- ✅ Check Firebase project is active (not on Spark plan limits)
- ✅ Ensure Firestore, Auth, and Storage are enabled
- ✅ Check browser console for detailed error messages

### Authentication Issues
- ✅ Verify Email/Password provider is enabled
- ✅ Check authorized domains include your localhost and deployment domain
- ✅ Use demo credentials for testing: admin@rishvigems.com / admin123

### Database Issues
- ✅ Ensure Firestore rules are deployed correctly
- ✅ Check that products collection exists
- ✅ Verify index creation (automatic for simple queries)

### Storage Issues
- ✅ Ensure Storage rules are deployed correctly
- ✅ Check file size limits (10MB for products)
- ✅ Verify file types are images only

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Firebase project settings
3. Ensure all services are enabled
4. Check your billing plan (Spark plan has limitations)

The application includes comprehensive error handling and will fall back to demo mode if Firebase is not properly configured.

## 🎉 Success!

Once configured, your jewelry gallery will have:
- ✨ Real-time product management
- 🔐 Secure admin authentication  
- 📱 Responsive customer interface
- ☁️ Cloud-based image storage
- 🚀 Scalable Firebase backend

**Demo Credentials for Testing:**
- Email: `admin@rishvigems.com`
- Password: `admin123`