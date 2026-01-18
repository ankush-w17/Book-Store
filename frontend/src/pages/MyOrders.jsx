import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders");
            }
        };
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
      <div className="min-h-screen bg-white pb-20 pt-10 px-20 relative">
         <div className="max-w-4xl mx-auto mb-6 text-xs text-[#9D9D9D]">
             Home / My Orders
         </div>

         <div className="max-w-4xl mx-auto space-y-6">
             {orders.map(order => (
                 order.items.filter(item => item.bookId).map((item, index) => (
                    <div key={`${order._id}-${index}`} className="border border-[#E4E4E4] p-6 flex gap-6 items-start bg-white rounded-[1px]">
                         <div className="w-[80px] h-[100px] flex-shrink-0">
                                 <img src={item.bookId.image} alt={item.bookId.title} className="w-full h-full object-contain" />
                         </div>
                         <div className="flex-1">
                             <h2 className="text-lg font-medium text-[#0A0102] mb-1">{item.bookId.title}</h2>
                             <p className="text-xs text-[#9D9D9D] mb-4">by {item.bookId.author}</p>
                             <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-[#0A0102] text-sm">
                                    Rs. {item.price}
                                </span>
                             </div>
                         </div>
                         <div className="flex items-center gap-2 pt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-[#0A0102]">Order Placed on {formatDate(order.createdAt)}</span>
                         </div>
                    </div>
                 ))
             ))}
             {orders.length === 0 && (
                 <div className="text-center text-gray-500 py-10">No orders found.</div>
             )}
         </div>
      </div>
    );
};

export default MyOrders;
