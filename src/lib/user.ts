'use client';

import { doc, setDoc } from 'firebase/firestore';
import { initializeFirebase, FirestorePermissionError, errorEmitter } from '@/firebase';

// This function should be called ONLY after a user is successfully created via Firebase Auth
export async function createCustomerProfile(
  userId: string,
  customerData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
  }
) {
  const { firestore } = initializeFirebase();
  if (!firestore) {
    throw new Error('Firestore is not initialized.');
  }

  const customerRef = doc(firestore, 'customers', userId);

  // Use setDoc with merge:true to create or update the profile
  setDoc(customerRef, customerData, { merge: true }).catch((error) => {
    console.error('Error creating customer profile:', error);

    const permissionError = new FirestorePermissionError({
      path: customerRef.path,
      operation: 'create',
      requestResourceData: customerData,
    });
    
    errorEmitter.emit('permission-error', permissionError);
  });
}
