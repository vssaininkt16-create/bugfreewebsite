// Firebase Database Configuration and Connection
import { db } from './config';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';

// Real-time listeners
export const subscribeToCollection = (collectionName, callback, constraints = []) => {
  const q = query(collection(db, collectionName), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const subscribeToDocument = (collectionName, docId, callback) => {
  const docRef = doc(db, collectionName, docId);
  return onSnapshot(docRef, (doc) => {
    callback(doc.exists() ? { id: doc.id, ...doc.data() } : null);
  });
};

// CRUD Operations with timestamps
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data, id: docRef.id };
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const createDocumentWithId = async (collectionName, docId, data) => {
  try {
    await setDoc(doc(db, collectionName, docId), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error('Error creating document with ID:', error);
    throw error;
  }
};

export const updateDocumentWithTimestamp = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

// Query helpers
export const getDocumentsByField = async (collectionName, field, operator, value, additionalConstraints = []) => {
  try {
    const q = query(
      collection(db, collectionName), 
      where(field, operator, value),
      ...additionalConstraints
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};

export const getOrderedDocuments = async (collectionName, field, direction = 'asc', limitCount = null) => {
  try {
    const constraints = [orderBy(field, direction)];
    if (limitCount) constraints.push(limit(limitCount));
    
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting ordered documents:', error);
    throw error;
  }
};

// Batch operations
export const batchOperations = async (operations) => {
  const batch = writeBatch(db);
  
  operations.forEach(({ type, ref, data }) => {
    switch (type) {
      case 'set':
        batch.set(ref, data);
        break;
      case 'update':
        batch.update(ref, data);
        break;
      case 'delete':
        batch.delete(ref);
        break;
    }
  });
  
  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error executing batch operations:', error);
    throw error;
  }
};

// Export utilities
export { where, orderBy, limit, serverTimestamp };
