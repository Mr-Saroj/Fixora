import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useAppDispatch } from './redux/hooks';
import { loginSuccess, logout } from './redux/slices/authSlice';
import { getCurrentUser } from './features/auth/services/authService'; // adjust path if needed

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

      try {
        const response = await getCurrentUser();
        const data = response.data;

        if (data.success) {
          dispatch(loginSuccess(data.data));
        } else {
          localStorage.removeItem('token');
          dispatch(logout());
        }
      } catch (error) {
        console.error('Session restore failed:', error);
        localStorage.removeItem('token');
        dispatch(logout());
      } finally {
        setIsCheckingAuth(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  // ⏳ Prevent flashing "logged out" UI while we're still checking the token
  if (isCheckingAuth) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
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