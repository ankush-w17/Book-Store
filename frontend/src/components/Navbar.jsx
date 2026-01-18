import React, { useState } from 'react';
import { Search, User, ShoppingCart, BookOpen, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
        navigate(`/?keyword=${keyword}`);
    }
  };

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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8 border-l border-white/20 pl-8 h-8">
           {user ? (
             <div className="flex items-center gap-4">
                 <div className="flex flex-col items-center">
                    <User className="h-5 w-5" />
                    <span className="text-[10px] font-medium">{user.name.split(' ')[0]}</span>
                 </div>
                 <button onClick={logout} className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity gap-0.5 bg-transparent border-0 p-0">
                    <LogOut className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Logout</span>
                 </button>
             </div>
           ) : (
             <Link to="/login" className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity gap-0.5">
                <User className="h-5 w-5" />
                <span className="text-[10px] font-medium">Login</span>
             </Link>
           )}
          
          <Link to="/cart" className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity gap-0.5 relative">
             <div className="relaitve">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 left-3 bg-white text-[#A03037] text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                )}
             </div>
            <span className="text-[10px] font-medium">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
