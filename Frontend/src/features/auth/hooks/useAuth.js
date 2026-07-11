import { useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Logging in with:', credentials);
      setIsLoading(false);
    }, 1500);
  };

  const register = async (userData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Registering user:', userData);
      setIsLoading(false);
    }, 1500);
  };

  return { login, register, isLoading };
};