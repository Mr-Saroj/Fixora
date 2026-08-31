import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useAppDispatch } from './redux/hooks';
import { loginSuccess, logout } from './redux/slices/authSlice';
import { getCurrentUser } from './features/auth/services/authService'; // adjust path if needed
import PageLoader from './components/common/PageLoader'; // adjust path if needed

const App = () => {
  const dispatch = useAppDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      // ✅ Admin has no DB record — restore from localStorage directly
      const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (savedUser?.role === 'ADMIN') {
        dispatch(loginSuccess(savedUser));
        setIsCheckingAuth(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        const data = response.data;

        if (data.success) {
          dispatch(loginSuccess(data.data));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch(logout());
        }
      } catch (error) {
        console.error('Session restore failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout());
      } finally {
        setIsCheckingAuth(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  // ⏳ Prevent flashing "logged out" UI while we're still checking the token
  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <>
      {/* This automatically handles rendering the correct page
        based on the URL in the browser
      */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;