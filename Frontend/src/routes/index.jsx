import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../features/home/Home';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import DashboardLayout from '../features/customer/components/DashboardLayout';
import TechnicianDashboardLayout from '../features/Technician/components/TechnicianDashboardLayout';



// Import your pages


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/customer-dashboard',
    element: <DashboardLayout />,
  },
  {
    path: '/technician-dashboard',
    element: <TechnicianDashboardLayout />,
  },
]);