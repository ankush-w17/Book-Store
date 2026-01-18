import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Requirements said "UI Only" or "Add this page". 
    alert(`Password reset link sent to ${email}`);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white pt-16 flex justify-center">
      <div className="w-full max-w-[400px]">
        
        <h1 className="text-xl font-medium text-center text-[#0A0102] mb-8">
            Forgot Your Password?
        </h1>

        <div className="bg-white border border-[#E4E4E4] p-8 rounded-[1px] shadow-sm">
            <p className="text-xs text-[#9D9D9D] mb-6 leading-relaxed">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-[10px] font-medium text-[#0A0102] mb-1">Email Id</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#E4E4E4] p-2.5 text-sm rounded-[1px] focus:outline-none focus:border-[#A03037]"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-[#A03037] text-white py-2.5 text-sm font-medium rounded-[2px] mb-6">
                    Reset Password
                </button>
            </form>

            <div className="text-center pt-6 border-t border-[#E4E4E4]">
                 <Link to="/register" className="text-sm font-medium text-[#0A0102] uppercase hover:text-[#A03037]">
                     Create Account
                 </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
