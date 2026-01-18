import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, mobile);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f5f5f5]">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
                 <div className="flex justify-between mb-8">
                    <h2 className={`text-xl font-bold uppercase cursor-pointer ${!isSignup ? 'text-black' : 'text-gray-400'}`} onClick={() => navigate('/login')}>Login</h2>
                    <h2 className={`text-xl font-bold uppercase cursor-pointer ${isSignup ? 'text-black' : 'text-gray-400'}`} onClick={() => setIsSignup(true)}>Signup</h2>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold">Full Name</label>
                        <input 
                            type="text" 
                            className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#A03037]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold">Mobile Number</label>
                        <input 
                            type="tel" 
                            className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#A03037]"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="bg-[#A03037] text-white py-2 rounded font-bold text-sm hover:bg-[#8B292F] transition-colors mt-2">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
