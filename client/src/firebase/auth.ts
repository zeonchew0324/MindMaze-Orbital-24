import {auth} from './firebase-config';

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, updateProfile, deleteUser, User, UserCredential } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

export const doCreateUser = async (email: string, password: string, username: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateUsername(userCredential.user, username)
  return userCredential;
};

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

export const updateUsername = async (cred: User | null = auth.currentUser, newUsername: string) => {
  const currentUser = cred;
  if (currentUser) {
    try {
      await updateProfile(currentUser, { displayName: newUsername }); 
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        await updateDoc(userDocRef, { username: newUsername });
      } else {
        await setDoc(userDocRef, { username: newUsername, email: currentUser.email });
      }

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