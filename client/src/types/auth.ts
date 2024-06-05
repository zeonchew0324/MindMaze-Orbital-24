import { User, onAuthStateChanged } from 'firebase/auth'
import { ReactNode } from 'react';

export type AuthStatus = {
  currentUser: User | null,
  userLoggedIn: boolean,
  loading: boolean,
  token: string,
}

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthTokenProp = {
  token: string,
}
