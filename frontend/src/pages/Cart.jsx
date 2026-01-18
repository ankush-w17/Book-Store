import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
             const price = item.bookId.discountPrice > 0 ? item.bookId.discountPrice : item.bookId.price;
             return total + (price * item.quantity);
        }, 0);
    };

    return (
        <div className="min-h-screen bg-white">
             {/* Breadcrumb dummy */}
             <div className="max-w-7xl mx-auto px-20 pt-6 pb-2 text-xs text-[#9D9D9D]">
                Home / My Cart
             </div>

             <div className="max-w-7xl mx-auto px-20 py-4 flex gap-8">
                {/* Cart Items */}
                <div className="flex-1 border border-[#E4E4E4] h-fit">
                    <div className="bg-white p-6">
                        <h2 className="text-lg font-medium text-[#0A0102]">My Cart ({cartItems.length})</h2>
                    </div>
                    {cartItems.map(item => (
                        <div key={item.bookId._id} className="flex gap-6 p-6 border-t border-[#E4E4E4]">
                             <div className="w-[80px] h-[100px] flex-shrink-0">
                                 <img src={item.bookId.image} alt={item.bookId.title} className="w-full h-full object-contain" />
                             </div>
                             <div className="flex-1">
                                 <h3 className="text-sm font-medium text-[#0A0102] mb-1">{item.bookId.title}</h3>
                                 <p className="text-[10px] text-[#9D9D9D] mb-3">by {item.bookId.author}</p>
                                 
                                 <div className="flex items-center gap-2 mb-4">
                                    <span className="font-bold text-[#0A0102] text-sm">
                                        Rs. {item.bookId.discountPrice > 0 ? item.bookId.discountPrice : item.bookId.price}
                                    </span>
                                    {item.bookId.discountPrice > 0 && (
                                        <span className="text-[#9D9D9D] text-[10px] line-through">Rs. {item.bookId.price}</span>
                                    )}
                                 </div>
                                 
                                 <div className="flex items-center gap-4">
                                     <div className="flex items-center gap-2">
                                         <button className="w-6 h-6 rounded-full border border-[#DBDBDB] flex items-center justify-center text-[#DBDBDB] hover:border-black hover:text-black">-</button>
                                         <span className="border border-[#DBDBDB] w-10 h-6 flex items-center justify-center text-sm">{item.quantity}</span>
                                          <button className="w-6 h-6 rounded-full border border-[#DBDBDB] flex items-center justify-center text-[#DBDBDB] hover:border-black hover:text-black">+</button>
                                     </div>
                                     <button className="text-sm font-medium text-[#0A0102] hover:text-[#A03037]" onClick={() => removeFromCart(item.bookId._id)}>Remove</button>
                                 </div>
                             </div>
                        </div>
                    ))}
                    {cartItems.length === 0 && <div className="p-6 text-center text-gray-500">Your cart is empty.</div>}
                    <div className="bg-white p-6 flex justify-end">
                        {cartItems.length > 0 && (
                             <button className="bg-[#3371B5] text-white px-8 py-2 rounded-[2px] font-medium text-sm w-[150px] uppercase" onClick={() => navigate('/checkout')}>Place Order</button>
                        )}
                    </div>
                </div>

                {/* Right: Address or Summary Placeholder */}
                {cartItems.length > 0 && (
                     <div className="w-[300px] bg-white border border-[#E4E4E4] h-fit p-4">
                         <h3 className="font-medium mb-4">Price Details</h3>
                         <div className="flex justify-between text-sm mb-2">
                            <span>Price ({cartItems.length} items)</span>
                            <span>Rs. {calculateTotal()}</span>
                         </div>
                         <div className="flex justify-between text-sm mb-4 border-b border-[#E4E4E4] pb-4">
                            <span>Discount</span>
                            <span className="text-green-600">Rs. 0</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount</span>
                             <span>Rs. {calculateTotal()}</span>
                        </div>
                     </div>
                )}
             </div>
        </div>
    );
};

export default Cart;
