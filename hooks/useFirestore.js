import { useState, useEffect, useCallback } from 'react';
import { 
  getDocumentsByField,
  getOrderedDocuments,
  createDocument,
  createDocumentWithId,
  updateDocumentWithTimestamp,
  deleteDocument,
  subscribeToCollection,
  subscribeToDocument
} from '../firebase/database';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real-time subscription
  const subscribe = useCallback((constraints = []) => {
    setLoading(true);
    const unsubscribe = subscribeToCollection(collectionName, (result) => {
      setData(result);
      setLoading(false);
      setError(null);
    }, constraints);

    return unsubscribe;
  }, [collectionName]);

  // Query documents
  const queryDocuments = useCallback(async (field, operator, value, additionalConstraints = []) => {
    try {
      setLoading(true);
      const result = await getDocumentsByField(collectionName, field, operator, value, additionalConstraints);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Get ordered documents
  const getOrdered = useCallback(async (field, direction = 'asc', limitCount = null) => {
    try {
      setLoading(true);
      const result = await getOrderedDocuments(collectionName, field, direction, limitCount);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Create document
  const create = useCallback(async (documentData) => {
    try {
      const result = await createDocument(collectionName, documentData);
      setData(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName]);

  // Create document with specific ID
  const createWithId = useCallback(async (docId, documentData) => {
    try {
      const result = await createDocumentWithId(collectionName, docId, documentData);
      setData(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName]);

  // Update document
  const update = useCallback(async (docId, updateData) => {
    try {
      const result = await updateDocumentWithTimestamp(collectionName, docId, updateData);
      setData(prev => prev.map(item => 
        item.id === docId ? { ...item, ...result } : item
      ));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName]);

  // Delete document
  const remove = useCallback(async (docId) => {
    try {
      await deleteDocument(collectionName, docId);
      setData(prev => prev.filter(item => item.id !== docId));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName]);

  return {
    data,
    loading,
    error,
    subscribe,
    queryDocuments,
    getOrdered,
    create,
    createWithId,
    update,
    remove
  };
};

// Hook for real-time document subscription
export const useFirestoreDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!docId) {
      setDocument(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToDocument(collectionName, docId, (result) => {
      setDocument(result);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, loading, error };
};
