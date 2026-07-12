import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await loginUser(credentials);
      const data = response.data;

   if (data.success) {
  const user = data.data;

  // ✅ Console ALL data
  console.log('==========================================');
  console.log('✅ LOGIN SUCCESSFUL');
  console.log('==========================================');
  console.log('📦 Full API Response:',        data);
  console.log('👤 Full User Object:',          user);
  console.log('------------------------------------------');
  console.log('🆔 ID:',                        user.id);
  console.log('📛 Name:',                      user.name);
  console.log('📧 Email:',                     user.email);
  console.log('📱 Phone:',                     user.phone);
  console.log('🔑 Role:',                      user.role);
  console.log('🔧 Technician Type:',           user.technicianType ?? 'N/A (Customer)');
  console.log('🗺️  State:',                    user.state      ?? 'N/A');
  console.log('🏙️  District:',                 user.district   ?? 'N/A');
  console.log('🌆 City:',                      user.city       ?? 'N/A');
  console.log('📍 PIN Code:',                  user.pinCode    ?? 'N/A');
  console.log('==========================================');
  console.table(user); // 🗃️ Shows as a neat table in DevTools
  console.log('==========================================');

  localStorage.setItem('user', JSON.stringify(user));

  setTimeout(() => {
    if (user.role === 'CUSTOMER') {
      navigate('/customer-dashboard');
    } else if (user.role === 'TECHNICIAN') {
      navigate('/technician-dashboard');
    } else {
      alert('Unknown user role!');
    }
  }, 500);
} else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.log('❌ Login full error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login Error:', errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(userData);
      const data = response.data;

      if (data.success) {
        console.log('✅ Registration successful!');
        console.log('🆔 New User ID:', data.data);
        alert(data.message);
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.log('❌ Register full error:', error);
      const errorMessage = error.response?.data?.message || 'Network error. Is Spring Boot running?';
      console.error('Registration Error:', errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading };
};