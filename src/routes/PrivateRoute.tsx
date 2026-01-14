import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import React from "react";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
