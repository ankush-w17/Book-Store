import React from 'react';
import BookCard from '../components/BookCard';

const Home = () => {
  const books = [
    {
      id: 1,
      title: "Don't Make Me Think",
      author: "Steve Krug",
      rating: 4.5,
      ratingCount: 20,
      price: 1500,
      originalPrice: 2000,
      image: "https://m.media-amazon.com/images/I/41-lS90a1hL._SY445_SX342_.jpg"
    },
    {
      id: 2,
      title: "React Material-UI Cookbook",
      author: "Adam Boduch",
      rating: 4.5,
      ratingCount: 20,
      price: 1500,
      originalPrice: 2000,
      image: "https://m.media-amazon.com/images/I/71i05-6vklL._AC_UF1000,1000_QL80_.jpg"
    },
     {
      id: 3,
      title: "Mastering SharePoint Framework",
      author: "Stacy Hansen",
      rating: 4.6,
      ratingCount: 15,
      price: 1850,
      originalPrice: 2100,
      image: "https://m.media-amazon.com/images/I/71g7-2a-bLL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 4,
      title: "UX For Dummies",
      author: "Donald Norman",
      rating: 4.5,
      ratingCount: 20,
      price: 1500,
      originalPrice: 2000,
      image: "https://m.media-amazon.com/images/I/718N78A5V+L.jpg"
    },
    {
      id: 5,
      title: "A Project Guide to UX Design",
      author: "Russ Unger",
      rating: 4.5,
      ratingCount: 20,
      price: 1500,
      originalPrice: 2000,
      image: "https://m.media-amazon.com/images/I/71G12F2wVpL._AC_UF1000,1000_QL80_.jpg"
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-20 pt-10">
         <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-medium text-black">Books <span className="text-[#9D9D9D] text-sm font-normal">({books.length * 2} items)</span></h1>
            
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
                 <React.Fragment key={book.id}>
                    <BookCard book={book} />
                 </React.Fragment>
            ))}
             {/* Repeat to fill grid */}
             {books.map((book) => (
                    <BookCard key={`dup-${book.id}`} book={book} />
            ))}
         </div>
      </div>
    </div>
  );
};

export default Home;
