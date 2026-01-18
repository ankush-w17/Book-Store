import React from 'react';
import { Search, User, ShoppingCart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#A03037] text-white px-20 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-medium tracking-tight">Bookstore</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-12 relative">
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
             </div>
            <input
              type="text"
              placeholder="Search ..."
              className="w-full pl-10 pr-4 py-2 rounded-[4px] text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-white transition-all shadow-sm text-sm"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8 border-l border-white/20 pl-8 h-8">
          <div className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity gap-0.5">
            <User className="h-5 w-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity gap-0.5 relative">
             <div className="relaitve">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 left-3 bg-white text-[#A03037] text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    0
                </span>
             </div>
            <span className="text-[10px] font-medium">Cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
