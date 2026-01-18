import React, { useState, useEffect } from 'react';
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
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { fetchCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const { data } = await api.get('/addresses');
                setSavedAddresses(data);
            } catch (error) {
                console.error("Failed to fetch addresses");
            }
        };
        fetchAddresses();
    }, []);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleAddressSelect = (addr) => {
        setSelectedAddressId(addr._id);
        setAddress({
            fullName: addr.name,
            phone: addr.phone,
            fullAddress: addr.street,
            city: addr.city,
            state: addr.state
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/orders', { address });
            // Refresh cart context (should be empty now)
            await fetchCart();
            navigate('/order-success');
        } catch (error) {
            alert(error.response?.data?.message || 'Order failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-8 px-20">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-sm">
                
                {savedAddresses.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-medium mb-4">Select Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {savedAddresses.map(addr => (
                                <div 
                                    key={addr._id} 
                                    className={`border p-4 rounded cursor-pointer ${selectedAddressId === addr._id ? 'border-[#A03037] bg-red-50' : 'border-[#E4E4E4]'}`}
                                    onClick={() => handleAddressSelect(addr)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <input 
                                            type="radio" 
                                            name="selectedAddress" 
                                            checked={selectedAddressId === addr._id}
                                            onChange={() => handleAddressSelect(addr)}
                                            className="accent-[#A03037]"
                                        />
                                        <span className="text-sm font-medium">{addr.name}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 ml-5">
                                        {addr.street}, {addr.city} <br/>
                                        {addr.state} - {addr.pincode}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
