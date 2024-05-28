import { User, onAuthStateChanged } from 'firebase/auth'
import { ReactNode } from 'react';

export type AuthStatus = {
  currentUser: User | null,
  userLoggedIn: boolean,
  loading: boolean
}

export type AuthProviderProps = {
  children: ReactNode;
};
