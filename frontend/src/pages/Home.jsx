import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import api from '../utils/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState('relevance');
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchBooks = async () => {
        try {
            const { data } = await api.get(`/books?keyword=${keyword}&page=${page}&sort=${sort}`);
            setBooks(data.books);
            setPages(data.pages);
            setPage(data.page);
        } catch (error) {
            console.error("Failed to fetch books", error);
        }
    };
    fetchBooks();
  }, [keyword, page, sort]);

  // Reset page on search
  useEffect(() => {
      setPage(1);
  }, [keyword]);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-20 pt-10">
         <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-medium text-black">Books <span className="text-[#9D9D9D] text-sm font-normal">({books.length} items)</span></h1>
            
            <div className="relative">
                <select 
                    className="appearance-none border border-[#E4E4E4] rounded-[1px] py-1 pl-3 pr-8 text-xs text-black bg-white focus:outline-none cursor-pointer hover:bg-gray-50 font-normal"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="relevance">Sort by relevance</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
             </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {books.map(book => (
                 <React.Fragment key={book._id}>
                    <BookCard book={book} />
                 </React.Fragment>
            ))}
         </div>

         {/* Pagination */}
         {pages > 1 && (
             <div className="flex justify-center items-center gap-2 mt-8">
                 <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-full border border-[#E4E4E4] flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
                 >
                     <ChevronLeft className="h-4 w-4 text-[#0A0102]" />
                 </button>
                 
                 {[...Array(pages).keys()].map(x => (
                     <button
                        key={x + 1}
                        onClick={() => setPage(x + 1)}
                        className={`w-8 h-8 rounded-[2px] border flex items-center justify-center text-sm font-medium transition-colors ${
                            page === x + 1 
                            ? 'bg-[#A03037] text-white border-[#A03037]' 
                            : 'bg-white text-[#0A0102] border-[#E4E4E4] hover:bg-gray-50'
                        }`}
                     >
                         {x + 1}
                     </button>
                 ))}

                <button 
                    onClick={() => setPage(p => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="w-8 h-8 rounded-full border border-[#E4E4E4] flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
                 >
                     <ChevronRight className="h-4 w-4 text-[#0A0102]" />
                 </button>
             </div>
         )}
      </div>
    </div>
  );
};

export default Home;
