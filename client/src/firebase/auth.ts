import { auth } from "./firebase-config";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
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