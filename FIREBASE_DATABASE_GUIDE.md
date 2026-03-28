# Firebase Database Connection Guide

Your Next.js application is now fully configured to connect to Firebase Cloud Firestore for project `bugzero-e53f4`.

## Database Setup in Firebase Console

1. **Navigate to Firebase Console**: https://console.firebase.google.com/
2. **Select Project**: Choose `bugzero-e53f4`
3. **Create Firestore Database**:
   - Go to "Build" section → "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location (choose closest to your users)
   - Click "Create"

## Available Database Operations

### Real-time Data Sync
```javascript
import { useFirestore } from '../hooks/useFirestore';

function UserList() {
  const { data, loading, subscribe } = useFirestore('users');
  
  useEffect(() => {
    const unsubscribe = subscribe([orderBy('createdAt', 'desc')]);
    return () => unsubscribe();
  }, [subscribe]);
  
  return (
    <div>
      {data.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

### CRUD Operations
```javascript
import { useFirestore } from '../hooks/useFirestore';

function UserManager() {
  const { create, update, remove, queryDocuments } = useFirestore('users');
  
  // Create user
  const handleCreate = async () => {
    await create({ name: 'John', email: 'john@example.com' });
  };
  
  // Update user
  const handleUpdate = async (userId) => {
    await update(userId, { name: 'John Updated' });
  };
  
  // Delete user
  const handleDelete = async (userId) => {
    await remove(userId);
  };
  
  // Query users
  const handleQuery = async () => {
    const users = await queryDocuments('role', '==', 'admin');
  };
}
```

### Advanced Queries
```javascript
import { getDocumentsByField, getOrderedDocuments, where, orderBy } from '../firebase/database';

// Complex queries
const activeUsers = await getDocumentsByField(
  'users', 
  'status', 
  '==', 
  'active',
  [orderBy('createdAt', 'desc'), limit(10)]
);

// Get recent users
const recentUsers = await getOrderedDocuments('users', 'createdAt', 'desc', 5);
```

## Demo Application

Visit `/firebase-demo` to test the database functionality:

1. **Authentication**: Sign in/up with email and password
2. **Database Operations**: Full CRUD interface
3. **Real-time Updates**: See changes instantly across multiple tabs

## Database Security Rules

For production, update your Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Authenticated users can read public data
    match /public/{documentId} {
      allow read: if request.auth != null;
    }
    
    // Admin-only access
    match /admin/{documentId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Database Schema Examples

### Users Collection
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  role: "user", // user, admin, moderator
  status: "active", // active, inactive, suspended
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Projects Collection
```javascript
{
  title: "My Project",
  description: "Project description",
  ownerId: "user123",
  status: "active", // active, completed, archived
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Tasks Collection
```javascript
{
  title: "Task Title",
  description: "Task description",
  projectId: "project123",
  assignedTo: "user456",
  status: "pending", // pending, in_progress, completed
  priority: "medium", // low, medium, high
  dueDate: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Performance Tips

1. **Use Indexes**: Create composite indexes for complex queries
2. **Batch Operations**: Use batch writes for multiple documents
3. **Pagination**: Implement pagination for large datasets
4. **Cache Strategy**: Use local caching for frequently accessed data

## Testing Commands

```bash
# Start development server
npm run dev

# Visit the demo page
http://localhost:3000/firebase-demo
```

## Environment Variables

Ensure these are set in your `.env.local` and Vercel:

```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bugzero-e53f4
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bugzero-e53f4.firebaseapp.com
# ... other Firebase config
```

Your Firebase database integration is now complete and ready for production use!
