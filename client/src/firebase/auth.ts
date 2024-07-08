import axios from 'axios';
import {auth} from './firebase-config';

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, deleteUser, User } from "firebase/auth";

export const doCreateUser = async (email: string, password: string, username: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  try {
    const reqBody = {
      formInfo: {
        username: username,
        email: email
      },
      cred: userCredential
    }
    await axios.post(`/user/signup`, reqBody, {
      headers: {
        Authorization: "Bearer " + userCredential.user.getIdToken()
      }
    })
    console.log('Successfully signed up')
    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error)
  }
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
  try {
    const uid = cred?.uid
    const reqBody = {username: newUsername}
    await axios.put(`/api/habits/${uid}`, reqBody, {
      headers: {
        Authorization: "Bearer " + cred?.getIdToken()
      }
    })
    console.log('Successfully updated username')
  } catch (error) {
    console.error('Error updating username:', error)
  }
}

export const deleteAccount = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await deleteUser(currentUser);
      const uid = auth.currentUser?.uid
      await axios.get(`/api/habits/${uid}`, {
        headers: {
          Authorization: "Bearer " + auth.currentUser?.getIdToken()
        }
      })
      console.log('Successfully deleted account')
    }
  } catch (error) {
    console.error('Error deleting account:', error)
  }
}

/* not completed */
export const getMazeCompleted = () => {
  return 0
}

export const getCurrentUser = () => {
  return auth.currentUser;
}