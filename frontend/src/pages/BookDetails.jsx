import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}`);
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details", error);
      }
    };
    const fetchReviews = async () => {
        try {
            const { data } = await api.get(`/reviews/${id}`);
            setReviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        }
    };
    fetchBook();
    fetchReviews();
  }, [id]);

  const handleAddToCart = async () => {
      if (!user) {
          navigate('/login');
          return;
      }
      await addToCart(book._id);
      toast.success("Added to Bag");
  };

  const handleSubmitReview = async () => {
      if (!user) {
          navigate('/login');
          return;
      }
      try {
          await api.post('/reviews', {
              bookId: book._id,
              rating: userRating,
              comment
          });
          // Refresh reviews
          const { data } = await api.get(`/reviews/${id}`);
          setReviews(data);
          setComment('');
          setUserRating(0);
          toast.success("Review submitted");
      } catch (error) {
          toast.error('Failed to submit review');
      }
  };

  if (!book) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen pb-20 pt-10 px-20">
       <div className="max-w-7xl mx-auto flex gap-12">
            {/* Left: Images */}
            <div className="flex gap-4">
                 <div className="flex flex-col gap-2">
                     <div className="border border-[#D1D1D1] p-1 cursor-pointer hover:border-[#A03037]">
                         <img src={book.image} alt={book.title} className="w-10 h-14 object-cover" />
                     </div>
                      <div className="border border-[#D1D1D1] p-1 cursor-pointer hover:border-[#A03037]">
                         <img src={book.image} alt={book.title} className="w-10 h-14 object-cover" />
                     </div>
                 </div>
                 <div className="border border-[#D1D1D1] p-4 w-[300px] h-[380px] flex items-center justify-center">
                    <img src={book.image} alt={book.title} className="max-h-full max-w-full object-contain" />
                 </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1">
                <h1 className="text-2xl font-medium text-[#0A0102] mb-1">{book.title}</h1>
                <p className="text-[#878787] text-sm mb-2">by {book.author}</p>
                
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[#388E3C] text-white text-[12px] font-bold px-2 py-[2px] rounded-[2px] flex items-center gap-1">
                        {book.averageRating} <Star className="h-3 w-3 fill-current" />
                    </div>
                    <span className="text-[#878787] text-sm">({reviews.length})</span>
                </div>

                <div className="flex items-end gap-3 mb-6 border-b border-[#E4E4E4] pb-6">
                    <span className="text-2xl font-bold text-[#0A0102]">Rs. {book.discountPrice > 0 ? book.discountPrice : book.price}</span>
                    {book.discountPrice > 0 && (
                        <span className="text-[#878787] text-sm line-through mb-1">Rs. {book.price}</span>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="text-[#878787] text-[13px] font-medium flex items-center gap-1 mb-2">
                        <span className="w-1 h-1 rounded-full bg-[#878787]"></span> Book Detail
                    </h3>
                    <p className="text-[#373434] text-xs leading-5">
                        {book.description}
                    </p>
                </div>

                {/* Feedback Section */}
                <div className="mb-8 border-t border-[#E4E4E4] pt-6">
                    <h3 className="font-medium text-lg mb-4">Customer Feedback</h3>
                     <div className="bg-[#F5F5F5] p-4 rounded-sm mb-6">
                        <div className="text-xs mb-2">Overall rating</div>
                        <div className="flex gap-1 text-gray-400 mb-4 cursor-pointer">
                            {[1,2,3,4,5].map(s => (
                                <Star 
                                    key={s} 
                                    className={`h-4 w-4 ${s <= userRating ? 'fill-[#FFC107] text-[#FFC107]' : ''}`} 
                                    onClick={() => setUserRating(s)}
                                />
                            ))}
                        </div>
                        <textarea 
                            placeholder="Write your review" 
                            className="w-full p-2 text-sm border-0 focus:outline-none mb-2 resize-none"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button 
                                onClick={handleSubmitReview}
                                className="bg-[#3371B5] text-white text-xs px-4 py-1.5 rounded-[2px] font-medium hover:bg-[#285a90]"
                            >
                                Submit
                            </button>
                        </div>
                     </div>

                     {/* Reviews List */}
                     <div className="flex flex-col gap-4">
                         {reviews.map((review, index) => (
                             <div key={index} className="flex flex-col gap-1 border-b border-gray-100 pb-2">
                                 <div className="flex items-center gap-2">
                                     <div className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                         {review.userId?.name ? review.userId.name[0] : 'U'}
                                     </div>
                                     <span className="text-sm font-medium">{review.userId?.name || 'User'}</span>
                                 </div>
                                 <div className="flex gap-1">
                                      {[1,2,3,4,5].map(s => (
                                            <Star key={s} className={`h-3 w-3 ${s <= review.rating ? 'fill-[#FFC107] text-[#FFC107]' : 'text-gray-300'}`} />
                                      ))}
                                 </div>
                                 <p className="text-xs text-gray-600">{review.comment}</p>
                             </div>
                         ))}
                     </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={handleAddToCart}
                        className="bg-[#A03037] text-white px-8 py-2 rounded-[2px] font-medium text-sm flex-1 max-w-[150px] hover:bg-[#8B292F] uppercase"
                    >
                        Add to Bag
                    </button>
                    <button 
                        onClick={async () => {
                            if (!user) {
                                navigate('/login');
                                return;
                            }
                            try {
                                await api.post('/wishlist', { bookId: book._id });
                                toast.success("Added to Wishlist");
                            } catch (error) {
                                toast.error("Failed to add to wishlist");
                            }
                        }}
                        className="bg-[#333333] text-white px-8 py-2 rounded-[2px] font-medium text-sm flex-1 max-w-[150px] flex items-center justify-center gap-2 hover:bg-black uppercase"
                    >
                        <Heart className="h-4 w-4" /> Wishlist
                    </button>
                </div>
            </div>
       </div>
    </div>
  );
};

export default BookDetails;
