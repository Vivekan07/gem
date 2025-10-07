# 🔥 Firebase Setup Guide for Rishwi Gems Gallery

## 📋 Complete Setup Checklist

### Step 1: Create Firebase Project
1. **Go to Firebase Console**
   - Open: https://console.firebase.google.com
   - Sign in with your Google account

2. **Create Project**
   - Click "Create a project" or "Add project"
   - **Project name:** `Rishwi Gems Gallery`
   - **Project ID:** Will be auto-generated (e.g., `rishwi-gems-gallery-xxxxx`)
   - **Google Analytics:** Enable or disable (optional for this project)
   - Click "Create project"

### Step 2: Enable Required Services

#### 2A. Enable Firestore Database
1. In Firebase Console → **"Firestore Database"**
2. Click **"Create database"**
3. **Security rules:** Choose **"Start in test mode"** (we'll update rules later)
4. **Location:** Choose closest to your users:
   - `us-central1` (Iowa) - for US users
   - `europe-west1` (Belgium) - for European users
   - `asia-south1` (Mumbai) - for Indian users
5. Click **"Done"**

#### 2B. Enable Authentication
1. In Firebase Console → **"Authentication"**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. **Enable** the first option (Email/Password)
6. Click **"Save"**

#### 2C. Enable Storage
1. In Firebase Console → **"Storage"**
2. Click **"Get started"**
3. **Security rules:** Choose **"Start in test mode"**
4. **Location:** Use the same location as Firestore
5. Click **"Done"**

### Step 3: Get Firebase Configuration

#### 3A. Add Web App
1. In Firebase Console → Click **gear icon** (Project Settings)
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** → Select **web icon** (`</>`)
4. **App nickname:** `Rishwi Gems Web App`
5. **Don't check** "Also set up Firebase Hosting"
6. Click **"Register app"**

#### 3B. Copy Configuration
You'll see a configuration like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "rishwi-gems-gallery-xxxxx.firebaseapp.com",
  projectId: "rishwi-gems-gallery-xxxxx",
  storageBucket: "rishwi-gems-gallery-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

**📝 COPY THESE VALUES** - You'll need them for the next step!

### Step 4: Update .env File
1. Open the `.env` file in your project root
2. Replace the placeholder values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=rishwi-gems-gallery-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=rishwi-gems-gallery-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=rishwi-gems-gallery-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
```

### Step 5: Configure Security Rules

#### 5A. Firestore Rules
1. In Firebase Console → **"Firestore Database"** → **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection
    match /products/{productId} {
      // Allow read access to all users (for customer view)
      allow read: if true;
      
      // Allow write access only to authenticated users (admin)
      allow write, update, delete: if request.auth != null;
    }
    
    // Admin-only collections
    match /admin/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // User profiles (future feature)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

#### 5B. Storage Rules
1. In Firebase Console → **"Storage"** → **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Product images
    match /products/{imageId} {
      // Allow read by all, write by authenticated users only
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Admin uploads
    match /admin/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 6: Create Admin User
1. In Firebase Console → **"Authentication"** → **"Users"** tab
2. Click **"Add user"**
3. **Email:** `admin@rishvigems.com`
4. **Password:** Choose a secure password (remember this!)
5. Click **"Add user"**

### Step 7: Test the Connection
1. Save the `.env` file with your Firebase config
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. The console should show: ✅ Firebase configuration detected
4. Try logging in with your admin credentials

## 🎯 Success Indicators

After completing these steps, you should see:

- ✅ **Console logs:** "Firebase configuration detected"
- ✅ **Console logs:** "Successfully connected to Firebase database"
- ✅ **Login works:** admin@rishvigems.com with your password
- ✅ **Admin panel:** Can add/edit/delete products
- ✅ **Images:** Can upload product images
- ✅ **Data persistence:** Products saved to Firestore

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase configuration detected" but connection fails:**
   - Check if Firestore is enabled in Firebase Console
   - Verify the project ID matches your config

2. **Authentication errors:**
   - Ensure Email/Password is enabled in Authentication settings
   - Check if the admin user was created correctly

3. **Storage upload fails:**
   - Verify Firebase Storage is enabled
   - Check storage rules are published

4. **App shows demo mode:**
   - Double-check all Firebase config values in `.env`
   - Restart development server after changing `.env`

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all Firebase services are enabled
3. Ensure security rules are published
4. Confirm `.env` file has correct values (no quotes around values)

---

**🎉 Once complete, your Rishwi Gems Gallery will be running on Firebase with:**
- Real-time product management
- Secure admin authentication  
- Cloud image storage
- Production-ready database