import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PageLoader from "../components/common/PageLoader";
import CustomerDashboardLayout from "../features/customer/components/CustomerDashboard";
import AnnouncementsPage from "../features/Admin/pages/AnnouncementsPage";
import TechnicianListPage from "../features/Admin/pages/TechnicianListPage";
import UserQueriesPage from "../features/Admin/pages/UserQueriesPage";
import TechnicianLoginApproval from "../features/Admin/pages/TechnicianLoginApproval";
import CustomerNotifications from "../features/customer/pages/CustomerNotifications";
import AdminMiddleContent from "../features/Admin/components/AdminMiddleContent";

// --- Lazy Page Imports ---
const PublicLayout = lazy(() => import("../components/layout/PublicLayout"));
const Home = lazy(() => import("../features/home/Home"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const ForgotPassword = lazy(() => import("../features/auth/pages/ForgotPassword"));

const TechnicianDashboardLayout = lazy(() =>
  import("../features/Technician/components/TechnicianDashboardLayout")
);

// Admin lazy pages
const AdminDashboardLayout = lazy(() =>
  import("../features/Admin/components/AdminDashboardLayout")
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
    element: withSuspense(CustomerDashboardLayout),
    children: [
      { index: true, element: withSuspense(MiddleContent) },
      { path: "requests", element: withSuspense(Request) },
      { path: "history", element: withSuspense(RequestHistory) },
      { path: "messages", element: withSuspense(CustomerNotifications) },
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
  {
    path: "/admin-dashboard",
    element: withSuspense(AdminDashboardLayout),
    children: [
      { index: true, element: withSuspense(AdminMiddleContent) },
      { path: "announcements", element: withSuspense(AnnouncementsPage) },
      { path: "technicians", element: withSuspense(TechnicianListPage) },
      { path: "technician-approvals", element: withSuspense(TechnicianLoginApproval) },
      { path: "user-queries", element: withSuspense(UserQueriesPage) },
    ],
  },

  // Catch-all 404 (must be last)
  {
    path: "*",
    element: withSuspense(NotFound),
  },
]);