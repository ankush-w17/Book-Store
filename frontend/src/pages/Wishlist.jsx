import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Trash2 } from 'lucide-react';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const { data } = await api.get('/wishlist');
            setWishlistItems(data.items || []);
        } catch (error) {
            console.error("Failed to fetch wishlist");
        }
    };

    const removeFromWishlist = async (bookId) => {
        try {
            await api.delete(`/wishlist/${bookId}`);
            fetchWishlist();
        } catch (error) {
            alert("Failed to remove item");
        }
    };

    return (
      <div className="min-h-screen bg-white pb-20 pt-10 px-20 relative">
         <div className="max-w-7xl mx-auto mb-6 text-xs text-[#9D9D9D]">
             Home / My Wishlist
         </div>

         <div className="max-w-7xl mx-auto border border-[#E4E4E4] bg-[#F5F5F5]">
             <div className="p-4 border-b border-[#E4E4E4]">
                 <h1 className="text-lg font-medium text-[#0A0102]">My Wishlist ({wishlistItems.length})</h1>
             </div>
             
             <div className="bg-white">
                 {wishlistItems.map(item => (
                     <div key={item.bookId._id} className="flex justify-between items-start p-6 border-b border-[#E4E4E4] last:border-0 hover:shadow-sm transition-shadow">
                         <div className="flex gap-6">
                             <div className="w-[80px] h-[100px] flex-shrink-0">
                                 <img src={item.bookId.image} alt={item.bookId.title} className="w-full h-full object-contain" />
                             </div>
                             <div>
                                 <h2 className="text-lg font-medium text-[#0A0102] mb-1">{item.bookId.title}</h2>
                                 <p className="text-xs text-[#9D9D9D] mb-4">by {item.bookId.author}</p>
                                 <div className="flex items-center gap-2">
                                     <span className="font-bold text-[#0A0102] text-sm">
                                         Rs. {item.bookId.discountPrice > 0 ? item.bookId.discountPrice : item.bookId.price}
                                     </span>
                                     {item.bookId.discountPrice > 0 && (
                                         <span className="text-[#9D9D9D] text-[10px] line-through">Rs. {item.bookId.price}</span>
                                     )}
                                 </div>
                             </div>
                         </div>
                         <button onClick={() => removeFromWishlist(item.bookId._id)} className="text-[#9D9D9D] hover:text-[#A03037]">
                             <Trash2 className="h-5 w-5" />
                         </button>
                     </div>
                 ))}
                 {wishlistItems.length === 0 && (
                     <div className="p-10 text-center text-gray-500 text-sm">
                         Your wishlist is empty.
                     </div>
                 )}
             </div>
         </div>
      </div>
    );
};

export default Wishlist;
