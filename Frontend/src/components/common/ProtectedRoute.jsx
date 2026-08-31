import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

/**
 * Wrap any route element with this to enforce login + role checks.
 *
 * Usage:
 * element: withSuspense(
 *   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
 *     <CustomerDashboardLayout />
 *   </ProtectedRoute>
 * )
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  // Not logged in at all → send to login, remember where they wanted to go
  if (!isLoggedIn || !user?.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, but role not allowed for this route
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Passed all checks — render the actual page
  return children;
};

export default ProtectedRoute;