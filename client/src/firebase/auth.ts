import {auth} from './firebase-config';

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, updateProfile, deleteUser } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore();


export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const doSendPasswordResetEmail = async (email: string) => {
  return sendPasswordResetEmail(auth, email)
}

export const doSignOut = () => {
  return auth.signOut()
}

export const doPasswordChange = (password: string) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return updatePassword(currentUser, password);
  }
}

export const updateUsername = async (newUsername: string) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      await updateProfile(currentUser, { displayName: newUsername }); 
      const userDoc = doc(db, 'users', currentUser.uid); 
      await updateDoc(userDoc, { username: newUsername });
    } catch (error) {
      console.error('Error updating username:', error);
      throw error; 
    }
  }
}


export const deleteAccount = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    await deleteUser(currentUser);
    const userDoc = doc(db, 'users', currentUser.uid);
    await updateDoc(userDoc, {deleted : true});
  }
}

/* not completed */
export const getMazeCompleted = () => {
  return 0
}

export const getCurrentUser = () => {
  return auth.currentUser;
}