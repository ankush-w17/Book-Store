import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div 
        onClick={() => navigate(`/book/${book._id}`)}
        className="bg-white border border-gray-200 rounded-[3px] p-5 flex flex-col hover:shadow-md transition-shadow cursor-pointer relative group"
    >
      <button 
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-[#A03037] shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={async (e) => {
              e.stopPropagation();
              try {
                await api.post('/wishlist', { bookId: book._id });
                toast.success("Added to Wishlist");
              } catch (err) {
                 if(err.response?.status === 401) window.location.href = '/login';
                 else toast.error(err.response?.data?.message || "Failed to add to wishlist");
              }
          }}
      >
        <Heart className="h-4 w-4" />
      </button>

      <div className="bg-[#F5F5F5] h-[160px] w-full flex items-center justify-center mb-4 rounded-sm overflow-hidden px-4 py-2">
         {book.image ? (
            <img src={book.image} alt={book.title} className="h-full object-contain shadow-sm" />
         ) : (
            <div className="text-gray-300 font-bold text-lg">NO IMAGE</div>
         )}
      </div>
      
      <div className="flex flex-col gap-1.5">
        <h3 className="font-medium text-gray-900 text-[15px] line-clamp-1" title={book.title}>{book.title}</h3>
        <p className="text-[#878787] text-[12px]">{book.author}</p>
        
        <div className="flex items-center gap-1.5">
            <div className="bg-[#388E3C] text-white text-[11px] font-bold px-1.5 py-[1px] rounded-[2px] flex items-center gap-0.5">
                {book.averageRating || 0} <Star className="h-2 w-2 fill-current" />
            </div>
            <span className="text-[#878787] text-[12px]">({book.quantity})</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-gray-900 text-[14px]">Rs. {book.discountPrice > 0 ? book.discountPrice : book.price}</span>
            {book.discountPrice > 0 && book.discountPrice < book.price && (
                <span className="text-[#878787] text-[11px] line-through">Rs. {book.price}</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
