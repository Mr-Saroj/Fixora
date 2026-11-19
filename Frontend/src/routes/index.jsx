
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import PageLoader from "../components/common/PageLoader";
import ProtectedRoute from "../components/common/ProtectedRoute";

// --- Lazy Page Imports ---

const PublicLayout = lazy(() =>
  import("../components/layout/PublicLayout")
);

const Home = lazy(() =>
  import("../features/home/Home")
);

const Login = lazy(() =>
  import("../features/auth/pages/Login")
);

const Register = lazy(() =>
  import("../features/auth/pages/Register")
);

const ForgotPassword = lazy(() =>
  import("../features/auth/pages/ForgotPassword")
);

const Unauthorized = lazy(() =>
  import("../components/common/Unauthorized")
);

const NotFound = lazy(() =>
  import("../components/common/NotFound")
);

// --- Customer Dashboard ---

const CustomerDashboardLayout = lazy(() =>
  import("../features/customer/components/CustomerDashboard")
);

const MiddleContent = lazy(() =>
  import("../features/customer/components/MiddleContent")
);

const Request = lazy(() =>
  import("../features/customer/pages/Request")
);

const RequestHistory = lazy(() =>
  import("../features/customer/pages/RequestHistory")
);

const CustomerNotifications = lazy(() =>
  import("../features/customer/pages/CustomerNotifications")
);

// --- Technician Dashboard ---

const TechnicianDashboardLayout = lazy(() =>
  import("../features/Technician/components/TechnicianDashboardLayout")
);

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

// --- Admin Dashboard ---

const AdminDashboardLayout = lazy(() =>
  import("../features/Admin/components/AdminDashboardLayout")
);

const AdminMiddleContent = lazy(() =>
  import("../features/Admin/components/AdminMiddleContent")
);

const AnnouncementsPage = lazy(() =>
  import("../features/Admin/pages/AnnouncementsPage")
);

const TechnicianListPage = lazy(() =>
  import("../features/Admin/pages/TechnicianListPage")
);

const UserQueriesPage = lazy(() =>
  import("../features/Admin/pages/UserQueriesPage")
);

const TechnicianLoginApproval = lazy(() =>
  import("../features/Admin/pages/TechnicianLoginApproval")
);

// --- Suspense Wrapper ---

const withSuspense = (element) => (
  <Suspense fallback={<PageLoader />}>
    {element}
  </Suspense>
);

// --- Router ---

export const router = createBrowserRouter([

  // PUBLIC ROUTES
  {
    element: withSuspense(<PublicLayout />),

    children: [

      // Home checks authentication
      {
        path: "/",
        element: withSuspense(<ProtectedRoute isHomePage />),
      },

      {
        path: "/login",
        element: withSuspense(<Login />),
      },

      {
        path: "/register",
        element: withSuspense(<Register />),
      },

      {
        path: "/forgot-password",
        element: withSuspense(<ForgotPassword />),
      },
    ],
  },

  // UNAUTHORIZED PAGE
  {
    path: "/unauthorized",
    element: withSuspense(<Unauthorized />),
  },

  // CUSTOMER DASHBOARD
  {
    element: <ProtectedRoute allowedRoles={["CUSTOMER"]} />,

    children: [
      {
        path: "/customer-dashboard",

        element: withSuspense(<CustomerDashboardLayout />),

        children: [
          {
            index: true,
            element: withSuspense(<MiddleContent />),
          },
          {
            path: "requests",
            element: withSuspense(<Request />),
          },
          {
            path: "history",
            element: withSuspense(<RequestHistory />),
          },
          {
            path: "messages",
            element: withSuspense(<CustomerNotifications />),
          },
        ],
      },
    ],
  },

  // TECHNICIAN DASHBOARD
  {
    element: <ProtectedRoute allowedRoles={["TECHNICIAN"]} />,

    children: [
      {
        path: "/technician-dashboard",

        element: withSuspense(<TechnicianDashboardLayout />),

        children: [
          {
            index: true,
            element: withSuspense(<TechMiddleContent />),
          },
          {
            path: "customer-requests",
            element: withSuspense(<CustomerRequest />),
          },
          {
            path: "accepted-requests",
            element: withSuspense(<AcceptedRequest />),
          },
          {
            path: "notifications",
            element: withSuspense(<Notifications />),
          },
        ],
      },
    ],
  },

  // ADMIN DASHBOARD
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,

    children: [
      {
        path: "/admin-dashboard",

        element: withSuspense(<AdminDashboardLayout />),

        children: [
          {
            index: true,
            element: withSuspense(<AdminMiddleContent />),
          },
          {
            path: "announcements",
            element: withSuspense(<AnnouncementsPage />),
          },
          {
            path: "technicians",
            element: withSuspense(<TechnicianListPage />),
          },
          {
            path: "technician-approvals",
            element: withSuspense(<TechnicianLoginApproval />),
          },
          {
            path: "user-queries",
            element: withSuspense(<UserQueriesPage />),
          },
        ],
      },
    ],
  },

  // 404 PAGE
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);
