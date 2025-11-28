
'use client';

import { doc, setDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { initializeFirebase, FirestorePermissionError, errorEmitter } from '@/firebase';
import type { Address } from './types';

// This function should be called ONLY after a user is successfully created via Firebase Auth
export async function createCustomerProfile(
  userId: string,
  customerData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
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

export async function addAddress(userId: string, addressData: Omit<Address, 'id'>) {
    const { firestore } = initializeFirebase();
    if (!firestore) throw new Error('Firestore is not initialized.');

    const addressesCollectionRef = collection(firestore, 'customers', userId, 'addresses');
    
    try {
        const docRef = await addDoc(addressesCollectionRef, addressData);
        return docRef.id;
    } catch (error) {
        const permissionError = new FirestorePermissionError({
            path: addressesCollectionRef.path,
            operation: 'create',
            requestResourceData: addressData,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw error;
    }
}

export async function updateAddress(userId: string, addressId: string, addressData: Partial<Address>) {
    const { firestore } = initializeFirebase();
    if (!firestore) throw new Error('Firestore is not initialized.');
    
    const addressRef = doc(firestore, 'customers', userId, 'addresses', addressId);

    setDoc(addressRef, addressData, { merge: true }).catch(error => {
        const permissionError = new FirestorePermissionError({
            path: addressRef.path,
            operation: 'update',
            requestResourceData: addressData,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw error;
    });
}

export async function deleteAddress(userId: string, addressId: string) {
    const { firestore } = initializeFirebase();
    if (!firestore) throw new Error('Firestore is not initialized.');

    const addressRef = doc(firestore, 'customers', userId, 'addresses', addressId);

    deleteDoc(addressRef).catch(error => {
        const permissionError = new FirestorePermissionError({
            path: addressRef.path,
            operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw error;
    });
}
