import { Request, Response } from "express";
import { collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const { firestoreDb } = require("../firebase/firebase-config") 

export async function handleSignup(req: Request, res: Response) {
  try {
    const db = firestoreDb;
    const {formInfo, cred} = req.body

    const currentUser = cred.user
    if (cred) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, { username: formInfo.username, email: currentUser.email });
    }
    res.json({ message: "Signup successful!" });
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
  
      return res.json({ message: 'Changed username successfully!' });
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
        await setDoc(userRef, {deleted : true});
      }

      return res.json({ message: 'Deleted account successfully!' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
}

export async function handleGetUsername(req: Request, res: Response) {
  try {
    const db = firestoreDb
    const { id } = req.params;

    // Get the user document using the provided UID
    const userRef = doc(db, 'users', id)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      return res.json(userDoc.data().username);
    } else {
      throw Error("Cannot send suername")
    }

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
