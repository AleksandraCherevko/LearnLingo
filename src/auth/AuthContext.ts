import type { User } from "firebase/auth";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuth: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuth: false,
  loading: true,
});
