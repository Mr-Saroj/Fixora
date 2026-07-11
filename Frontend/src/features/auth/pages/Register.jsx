import React from 'react';
import AuthLayout from '../components/AuthLayout';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <AuthLayout 
      title="Join Fixora" 
      subtitle="Create an account to book services or apply as a verified professional."
    >
      <RegisterForm />
      
      <div className="mt-8 pt-6 border-t border-black/[0.05] text-center">
        <p className="text-[14px] text-text-muted">
          Already have an account?{' '}
          <a href="/login" className="font-bold text-primary hover:text-[#57dffe] transition-colors">
            Sign In
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;