# Firebase Setup Guide for Vercel Deployment

This guide will help you complete the Firebase integration for your Next.js project when deploying on Vercel.

## 1. Get Your Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `bugzero-e53f4`
3. Click on the gear icon ⚙️ next to "Project Overview" and select "Project settings"
4. Under the "General" tab, scroll down to "Your apps" section
5. If you haven't already, click "Add app" and select "Web"
6. Give your app a nickname (e.g., "bugzero-web")
7. Click "Register app"
8. Copy the `firebaseConfig` object values

## 2. Update Your Environment Variables

### Local Development (.env.local)
Create a `.env.local` file in your project root and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bugzero-e53f4.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bugzero-e53f4
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bugzero-e53f4.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add each of the following variables with your actual Firebase values:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## 3. Firebase Services Available

Your project is now set up to use the following Firebase services:

### Authentication
- Email/Password authentication
- User session management
- Protected routes

### Firestore Database
- NoSQL document database
- Real-time data synchronization
- Query capabilities

### Storage
- File storage for images, videos, etc.
- Secure file uploads
- CDN integration

## 4. Usage Examples

### Using Authentication in Components
```jsx
import { useAuth } from '../hooks/useFirebase';

function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return user ? <div>Welcome, {user.email}!</div> : <div>Please sign in</div>;
}
```

### Using Firestore
```javascript
import { getCollection, setDocument } from '../firebase/utils';

// Get documents
const users = await getCollection('users');

// Add document
const newUser = await setDocument('users', 'user123', {
  name: 'John Doe',
  email: 'john@example.com'
});
```

## 5. Enable Firebase Services

In the Firebase Console, make sure to enable:

1. **Authentication**: 
   - Go to "Authentication" > "Sign-in method"
   - Enable "Email/Password"

2. **Firestore Database**:
   - Go to "Firestore Database"
   - Create a new database
   - Choose "Start in test mode" (for development)

3. **Storage** (if needed):
   - Go to "Storage"
   - Get started
   - Follow the security rules setup

## 6. Security Rules

For production, update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. Testing

1. Run your development server: `npm run dev`
2. Navigate to your auth page to test sign-in/sign-up
3. Check the browser console for any Firebase errors
4. Verify data appears in Firestore console

## 8. Deployment

Once you've configured your environment variables in Vercel, your Firebase integration will work automatically when deployed. The `NEXT_PUBLIC_` prefix ensures the variables are available in the browser.

## Troubleshooting

- **Firebase not initialized**: Check that all environment variables are set correctly
- **Auth errors**: Ensure Authentication is enabled in Firebase Console
- **Firestore permissions**: Update security rules if getting permission denied errors
- **Build errors**: Verify Firebase SDK is installed and imports are correct
