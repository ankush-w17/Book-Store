import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  
  // Personal Details State
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalData, setPersonalData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      mobile: user?.mobile || ''
  });

  // Address Form State
  const [addressData, setAddressData] = useState({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      type: 'Home'
  });

  useEffect(() => {
      fetchAddresses();
      if(user) {
          setPersonalData({ ...personalData, name: user.name, email: user.email, mobile: user.mobile || '' });
      }
  }, [user]);

  const fetchAddresses = async () => {
      try {
          const { data } = await api.get('/addresses');
          setAddresses(data);
      } catch (error) {
          console.error("Failed to fetch addresses");
      }
  };

  const handlePersonalUpdate = async () => {
      try {
          const update = { ...personalData };
          if(!update.password) delete update.password;
          await updateProfile(update);
          setIsEditingPersonal(false);
          alert("Profile Updated Successfully");
      } catch (error) {
          alert("Failed to update profile");
      }
  };

  const handleAddressSubmit = async (e) => {
      e.preventDefault();
      try {
          if (editingAddress) {
              await api.put(`/addresses/${editingAddress._id}`, addressData);
          } else {
              await api.post('/addresses', addressData);
          }
          fetchAddresses();
          setAddressData({ name: '', phone: '', street: '', city: '', state: '', pincode: '' });
          setShowAddressForm(false);
          setEditingAddress(null);
      } catch (error) {
          alert("Failed to save address");
      }
  };

  const handleEditAddress = (addr) => {
      setAddressData({
          name: addr.name,
          phone: addr.phone,
          street: addr.street,
          city: addr.city,
          state: addr.state,
          pincode: addr.pincode,
          type: addr.type || 'Home'
      });
      setEditingAddress(addr);
      setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id) => {
      if(window.confirm("Are you sure?")) {
          try {
              await api.delete(`/addresses/${id}`);
              fetchAddresses();
          } catch (error) {
              alert("Failed to delete address");
          }
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10 px-20 relative">
       {/* Breadcrumb */}
       <div className="max-w-4xl mx-auto mb-6 text-xs text-[#9D9D9D]">
           Home / Profile
       </div>

       <div className="max-w-4xl mx-auto">
           {/* Personal Details */}
           <div className="bg-white border border-[#E4E4E4] p-8 mb-8 relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-[#0A0102]">Personal Details</h2>
                    <button 
                        onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                        className="text-[#A03037] text-xs font-medium uppercase"
                    >
                        {isEditingPersonal ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6 max-w-lg">
                    <div>
                        <label className="block text-xs font-medium text-[#0A0102] mb-1">Full Name</label>
                        <input 
                            type="text" 
                            disabled={!isEditingPersonal}
                            value={personalData.name}
                            onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
                            className="w-full border border-[#E4E4E4] p-3 text-sm text-[#0A0102] disabled:bg-gray-50 disabled:text-gray-500 rounded-[1px]"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-[#0A0102] mb-1">Email Id</label>
                        <input 
                            type="email" 
                            disabled={!isEditingPersonal}
                            value={personalData.email}
                            onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                            className="w-full border border-[#E4E4E4] p-3 text-sm text-[#0A0102] disabled:bg-gray-50 disabled:text-gray-500 rounded-[1px]"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-[#0A0102] mb-1">Password</label>
                        <input 
                            type="password" 
                            disabled={!isEditingPersonal}
                            placeholder={isEditingPersonal ? "Enter new password" : "••••••••"}
                            value={personalData.password}
                            onChange={(e) => setPersonalData({...personalData, password: e.target.value})}
                            className="w-full border border-[#E4E4E4] p-3 text-sm text-[#0A0102] disabled:bg-gray-50 disabled:text-gray-500 rounded-[1px]"
                        />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-[#0A0102] mb-1">Mobile Number</label>
                        <input 
                            type="text" 
                            disabled={!isEditingPersonal}
                            value={personalData.mobile}
                            onChange={(e) => setPersonalData({...personalData, mobile: e.target.value})}
                            className="w-full border border-[#E4E4E4] p-3 text-sm text-[#0A0102] disabled:bg-gray-50 disabled:text-gray-500 rounded-[1px]"
                        />
                    </div>
                    {isEditingPersonal && (
                        <button onClick={handlePersonalUpdate} className="bg-[#A03037] text-white py-2 px-6 text-sm rounded-[2px] w-fit">Update</button>
                    )}
                </div>
           </div>

           {/* Address Details */}
           <div className="bg-white border border-[#E4E4E4] p-8 relative">
               <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-[#0A0102]">Address Details</h2>
                    <button 
                        onClick={() => {
                            setAddressData({ name: '', phone: '', street: '', city: '', state: '', pincode: '' });
                            setEditingAddress(null);
                            setShowAddressForm(!showAddressForm);
                        }}
                        className="text-[#A03037] text-xs font-medium border border-[#A03037] px-4 py-1.5 rounded-[2px]"
                    >
                        {showAddressForm ? 'Cancel' : 'Add New Address'}
                    </button>
                </div>

                {showAddressForm ? (
                    <form onSubmit={handleAddressSubmit} className="grid grid-cols-2 gap-4 max-w-2xl mb-8">
                         <div className="col-span-2">
                            <label className="block text-xs font-medium text-[#0A0102] mb-1">Address</label>
                            <textarea 
                                required
                                value={addressData.street}
                                onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                                className="w-full border border-[#E4E4E4] p-3 text-sm rounded-[1px] h-20 resize-none" 
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-medium text-[#0A0102] mb-1">City/Town</label>
                             <input 
                                required
                                type="text"
                                value={addressData.city}
                                onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                                className="w-full border border-[#E4E4E4] p-3 text-sm rounded-[1px]" 
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-medium text-[#0A0102] mb-1">State</label>
                             <input 
                                required
                                type="text"
                                value={addressData.state}
                                onChange={(e) => setAddressData({...addressData, state: e.target.value})}
                                className="w-full border border-[#E4E4E4] p-3 text-sm rounded-[1px]" 
                            />
                         </div>
                          <div>
                            <label className="block text-xs font-medium text-[#0A0102] mb-1">Pincode</label>
                             <input 
                                required
                                type="text"
                                value={addressData.pincode}
                                onChange={(e) => setAddressData({...addressData, pincode: e.target.value})}
                                className="w-full border border-[#E4E4E4] p-3 text-sm rounded-[1px]" 
                            />
                         </div>
                         <div className="col-span-2 grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs font-medium text-[#0A0102] mb-1">Name</label>
                                 <input 
                                    required
                                    type="text"
                                    value={addressData.name}
                                    onChange={(e) => setAddressData({...addressData, name: e.target.value})}
                                    className="w-full border border-[#E4E4E4] p-3 text-sm rounded-[1px]" 
                                />
                             </div>
                             <div>
                                <label className="block text-xs font-medium text-[#0A0102] mb-1">Mobile</label>
                                 <input 
                                    required
                                    type="text"
                                    value={addressData.phone}
                                    onChange={(e) => setAddressData({...addressData, phone: e.target.value})}
                                    className="w-full border border-[#E4E4E4] p-3 text-sm rounded-[1px]" 
                                />
                             </div>
                         </div>
                         
                         <div className="col-span-2">
                            <label className="block text-xs font-medium text-[#0A0102] mb-2">Type</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="addressType" 
                                        value="Home"
                                        checked={addressData.type === 'Home' || !addressData.type}
                                        onChange={(e) => setAddressData({...addressData, type: e.target.value})}
                                        className="accent-[#A03037]"
                                    />
                                    <span className="text-sm text-[#0A0102]">Home</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="addressType" 
                                        value="Work"
                                        checked={addressData.type === 'Work'}
                                        onChange={(e) => setAddressData({...addressData, type: e.target.value})}
                                        className="accent-[#A03037]"
                                    />
                                    <span className="text-sm text-[#0A0102]">Work</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="addressType" 
                                        value="Other"
                                        checked={addressData.type === 'Other'}
                                        onChange={(e) => setAddressData({...addressData, type: e.target.value})}
                                        className="accent-[#A03037]"
                                    />
                                    <span className="text-sm text-[#0A0102]">Other</span>
                                </label>
                            </div>
                         </div>

                        <button type="submit" className="bg-[#3371B5] text-white py-2 px-6 text-sm rounded-[2px] w-fit mt-2">
                             {editingAddress ? 'Update Address' : 'Add Address'}
                        </button>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((addr, index) => (
                             <div key={addr._id} className="border border-[#E4E4E4] p-4 rounded-[1px] relative">
                                 <div className="flex justify-between items-start mb-2">
                                     <h3 className="text-sm font-medium flex items-center gap-2">
                                         {index + 1}. {addr.type || 'Home'}
                                     </h3>
                                     <div className="flex gap-3">
                                        <button onClick={() => handleEditAddress(addr)} className="text-[#A03037] text-xs font-medium">Edit</button>
                                        <button onClick={() => handleDeleteAddress(addr._id)} className="text-[#A03037] text-xs font-medium">Delete</button>
                                     </div>
                                 </div>
                                 <p className="text-xs text-[#0A0102] leading-relaxed mb-4">
                                     {addr.name} <br/>
                                     {addr.street}, {addr.city} <br/>
                                     {addr.state} - {addr.pincode} <br/>
                                     {addr.phone}
                                 </p>
                             </div>
                        ))}
                        {addresses.length === 0 && <p className="text-sm text-gray-500">No addresses found.</p>}
                    </div>
                )}
           </div>
       </div>
    </div>
  );
};

export default Profile;
