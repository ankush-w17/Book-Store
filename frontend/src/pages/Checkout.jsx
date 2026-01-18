import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const [address, setAddress] = useState({
        fullName: '',
        phone: '',
        fullAddress: '',
        city: '',
        state: ''
    });
    const [loading, setLoading] = useState(false);
    const { fetchCart } = useCart();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/orders', { address });
            // Refresh cart context (should be empty now)
            await fetchCart();
            // Show success message or redirect
            alert('Order placed successfully!');
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Order failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-8 px-20">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-sm">
                <h1 className="text-xl font-medium mb-6">Customer Details</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold">Full Name</label>
                            <input 
                                type="text"
                                name="fullName"
                                value={address.fullName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 text-sm focus:border-[#A03037] focus:outline-none"
                                required 
                            />
                        </div>
                         <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold">Phone Number</label>
                            <input 
                                type="tel"
                                name="phone"
                                value={address.phone}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 text-sm focus:border-[#A03037] focus:outline-none"
                                required 
                            />
                        </div>
                     </div>

                     <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold">Address</label>
                        <textarea 
                            name="fullAddress"
                            value={address.fullAddress}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 text-sm focus:border-[#A03037] focus:outline-none h-24 resize-none"
                            required 
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold">City/Town</label>
                            <input 
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 text-sm focus:border-[#A03037] focus:outline-none"
                                required 
                            />
                        </div>
                         <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold">State</label>
                            <input 
                                type="text"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 text-sm focus:border-[#A03037] focus:outline-none"
                                required 
                            />
                        </div>
                     </div>

                     <div className="flex justify-end mt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-[#3371B5] text-white px-8 py-2 rounded-[2px] font-medium text-sm w-[150px] uppercase disabled:opacity-50"
                        >
                            {loading ? 'Processing' : 'Checkout'}
                        </button>
                     </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
