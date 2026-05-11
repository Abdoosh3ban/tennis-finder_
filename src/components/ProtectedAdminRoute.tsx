import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getStoredUser } from "../lib/auth";

type ProtectedAdminRouteProps = {
  children: ReactNode;
};

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const location = useLocation();
  const user = getStoredUser();

  if (!user || user.role !== "admin" || user.adminVerified !== true) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          reason: "admin-only",
        }}
      />
    );
  }

  return <>{children}</>;
}
