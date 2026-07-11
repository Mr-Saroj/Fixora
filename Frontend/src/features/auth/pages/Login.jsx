import React from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to access your dashboard and bookings."
    >
      <LoginForm />
      
      <div className="mt-8 pt-6 border-t border-black/[0.05] text-center">
        <p className="text-[14px] text-text-muted">
          Don't have an account yet?{' '}
          <a href="/register" className="font-bold text-primary hover:text-[#57dffe] transition-colors">
            Create one here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;