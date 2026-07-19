import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 🔄 Lazy-loaded pages — each becomes its own separate JS chunk
const Home = lazy(() => import('../features/home/Home'));
const Login = lazy(() => import('../features/auth/pages/Login'));
const Register = lazy(() => import('../features/auth/pages/Register'));
const DashboardLayout = lazy(() => import('../features/customer/components/DashboardLayout'));
const TechnicianDashboardLayout = lazy(() => import('../features/Technician/components/TechnicianDashboardLayout'));

// Simple loading spinner shown while a page chunk downloads
const PageLoader = () => (
  <div className="w-screen h-screen flex items-center justify-center">
    <span className="material-symbols-outlined animate-spin text-4xl text-primary">
      progress_activity
    </span>
  </div>
);

// Wraps each lazy page with a Suspense boundary
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Home),
  },
  {
    path: '/login',
    element: withSuspense(Login),
  },
  {
    path: '/register',
    element: withSuspense(Register),
  },
  {
    path: '/customer-dashboard',
    element: withSuspense(DashboardLayout),
  },
  {
    path: '/technician-dashboard',
    element: withSuspense(TechnicianDashboardLayout),
  },
]);