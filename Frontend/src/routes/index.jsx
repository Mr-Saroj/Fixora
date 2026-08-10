import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PageLoader from "../components/common/PageLoader";

// --- Lazy Page Imports ---
const PublicLayout = lazy(() => import("../components/layout/PublicLayout"));
const Home = lazy(() => import("../features/home/Home"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const ForgotPassword = lazy(() => import("../features/auth/pages/ForgotPassword"));

const DashboardLayout = lazy(() =>
  import("../features/customer/components/DashboardLayout")
);
const TechnicianDashboardLayout = lazy(() =>
  import("../features/Technician/components/TechnicianDashboardLayout")
);

// Customer lazy pages
const MiddleContent = lazy(() =>
  import("../features/customer/components/MiddleContent")
);
const Request = lazy(() =>
  import("../features/customer/pages/Request")
);
const RequestHistory = lazy(() =>
  import("../features/customer/pages/RequestHistory")
);

// Technician lazy pages
const TechMiddleContent = lazy(() =>
  import("../features/Technician/components/MiddleContent")
);
const CustomerRequest = lazy(() =>
  import("../features/Technician/pages/CustomerRequest")
);
const AcceptedRequest = lazy(() =>
  import("../features/Technician/pages/AcceptedRequest")
);
const Notifications = lazy(() =>
  import("../features/Technician/pages/Notifications")
);

// ⬇️ ADD THIS: Lazy import for the 404 Page
const NotFound = lazy(() => import("../components/common/NotFound"));

// --- Suspense Wrapper ---
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// --- Router ---
export const router = createBrowserRouter([
  {
    element: withSuspense(PublicLayout),
    children: [
      { path: "/", element: withSuspense(Home) },
      { path: "/login", element: withSuspense(Login) },
      { path: "/register", element: withSuspense(Register) },
      { path: "/forgot-password", element: withSuspense(ForgotPassword) },
    ],
  },
  {
    path: "/customer-dashboard",
    element: withSuspense(DashboardLayout),
    children: [
      { index: true, element: withSuspense(MiddleContent) },
      { path: "requests", element: withSuspense(Request) },
      { path: "history", element: withSuspense(RequestHistory) },
    ],
  },
  {
    path: "/technician-dashboard",
    element: withSuspense(TechnicianDashboardLayout),
    children: [
      { index: true, element: withSuspense(TechMiddleContent) },
      { path: "customer-requests", element: withSuspense(CustomerRequest) },
      { path: "accepted-requests", element: withSuspense(AcceptedRequest) },
      { path: "notifications", element: withSuspense(Notifications) },
    ],
  },
  
  // ⬇️ ADD THIS: Catch-all 404 Route (Must be at the very bottom)
  {
    path: "*",
    element: withSuspense(NotFound),
  }
]);