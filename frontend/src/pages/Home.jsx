import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import api from '../utils/api';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchBooks = async () => {
        try {
            const { data } = await api.get(`/books?keyword=${keyword}`);
            setBooks(data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        }
    };
    fetchBooks();
  }, [keyword]);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-20 pt-10">
         <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-medium text-black">Books <span className="text-[#9D9D9D] text-sm font-normal">({books.length} items)</span></h1>
            
            <div className="relative">
                <select className="appearance-none border border-[#E4E4E4] rounded-[1px] py-1 pl-3 pr-8 text-xs text-black bg-white focus:outline-none cursor-pointer hover:bg-gray-50 font-normal">
                    <option>Sort by relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                </select>
                {/* Custom arrow could go here */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
             </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map(book => (
                 <React.Fragment key={book._id}>
                    <BookCard book={book} />
                 </React.Fragment>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Home;
