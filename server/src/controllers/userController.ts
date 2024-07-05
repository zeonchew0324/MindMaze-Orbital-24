import { Request, Response } from "express";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, updateProfile, deleteUser, User, UserCredential } from "firebase/auth";

const { firestoreDb } = require("../firebase/firebase-config") 

export async function handleSignup(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const formInfo = req.body

    const userCredential = await createUserWithEmailAndPassword(auth, formInfo.email, formInfo.password);
    const currentUser = userCredential.user
    if (userCredential) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, { username: formInfo.username, email: currentUser.email });
    }
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
}

export async function handleChangeName(req: Request, res: Response) {
    try {
      const db = firestoreDb
      const { id } = req.params;
      const newName = req.body
  
      // Get the user document using the provided UID
      const userRef = doc(db, 'users', id)
      const userDoc = await getDoc(userRef)
  
      if (userDoc.exists()) {
        await updateDoc(userRef, { username: newName.username });
      }
  
      return res.json({ message: 'Added todo successfully!' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
}

export async function handleDeleteAccount(req: Request, res: Response) {
    try {
      const db = firestoreDb
      const { id } = req.params;
  
      // Get the user document using the provided UID
      const userRef = doc(db, 'users', id);
      const userDoc = await getDoc(userRef)
  
      if (userDoc.exists()) {
        await setDoc(userDoc, {deleted : true});
      }

      return res.json({ message: 'Deleted account successfully!' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
