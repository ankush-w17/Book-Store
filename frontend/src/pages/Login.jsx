import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false); // Toggle for simple switching in this demo

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await googleLogin(credentialResponse.credential);
            navigate('/');
        } catch (err) {
            setError('Google login failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f5f5f5]">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex justify-between mb-8">
                    <h2 className={`text-xl font-bold uppercase cursor-pointer ${!isSignup ? 'text-black' : 'text-gray-400'}`} onClick={() => setIsSignup(false)}>Login</h2>
                    <h2 className={`text-xl font-bold uppercase cursor-pointer ${isSignup ? 'text-black' : 'text-gray-400'}`} onClick={() => navigate('/register')}>Signup</h2>
                </div>
                
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold">Email Id</label>
                        <input 
                            type="email" 
                            className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#A03037]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold">Password</label>
                        <input 
                            type="password" 
                            className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#A03037]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                         <Link to="#" className="text-[10px] text-right text-gray-500 hover:text-[#A03037]">Forgot Password?</Link>
                    </div>
                    
                    <button type="submit" className="bg-[#A03037] text-white py-2 rounded font-bold text-sm hover:bg-[#8B292F] transition-colors mt-2">
                        Login
                    </button>
                    
                    <div className="flex items-center justify-between gap-4 my-2">
                         <div className="h-[1px] bg-gray-200 flex-1"></div>
                         <span className="text-xs text-gray-400">OR</span>
                         <div className="h-[1px] bg-gray-200 flex-1"></div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Login Failed')}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
