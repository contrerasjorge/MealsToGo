import React, { useState, createContext } from "react";
import * as firebase from "firebase";

import { loginRequest } from "./authentication.service";

type AuthenticationContextType = {
  isAuthenticated: boolean;
  user: firebase.UserInfo | firebase.User | firebase.auth.UserCredential | null;
  isLoading: boolean;
  error: string | null;
  onLogin?: (email: string, password: string) => void;
  onRegister?: (
    email: string,
    password: string,
    repeatPassword: string
  ) => void;
  onLogout?: () => void;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
});

export const AuthenticationContextProvider: React.FC<any> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<
    firebase.UserInfo | firebase.User | firebase.auth.UserCredential | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
