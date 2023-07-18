import { Navigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthServiceContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  console.log("test");
  return <>{children}</>;
};

export default ProtectedRoute;
