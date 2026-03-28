'use client';
import { DatabaseDemo } from '../../components/firebase/DatabaseDemo';
import { FirebaseAuthForm } from '../../components/firebase/FirebaseAuthForm';
import { AuthProvider } from '../../components/firebase/AuthProvider';
import { useAuth } from '../../hooks/useFirebase';

export default function FirebaseDemoPage() {
  return (
    <AuthProvider>
      <FirebaseDemoContent />
    </AuthProvider>
  );
}

function FirebaseDemoContent() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Firebase Integration Demo</h1>
          <p className="text-gray-600">
            Test Firebase Authentication and Firestore Database
          </p>
        </div>

        {!user ? (
          <FirebaseAuthForm />
        ) : (
          <div className="space-y-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-semibold">Signed in as: {user.email}</p>
            </div>
            <DatabaseDemo />
          </div>
        )}
      </div>
    </div>
  );
}
