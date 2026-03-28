import { useState, useEffect } from 'react';
import { onAuthChange } from '../firebase/utils';
import { auth } from '../firebase/config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export const useFirebaseAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      // Import here to avoid circular dependencies
      const { loginUser } = await import('../firebase/utils');
      const user = await loginUser(email, password);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { registerUser } = await import('../firebase/utils');
      const user = await registerUser(email, password);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      const { logoutUser } = await import('../firebase/utils');
      await logoutUser();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    error,
    loading,
    currentUser: auth.currentUser
  };
};
