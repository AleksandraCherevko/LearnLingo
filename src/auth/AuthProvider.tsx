// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import type { User } from "firebase/auth";
// import { auth } from "../firebase";
// import { AuthContext } from "./AuthContext";
// import type { ReactNode } from "react";

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const value = {
//     user,
//     isAuth: !!user,
//     loading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// src/auth/AuthProvider.tsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAuth = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
