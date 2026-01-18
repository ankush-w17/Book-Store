import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import MyOrders from './pages/MyOrders';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  const GOOGLE_CLIENT_ID = "56083661044-8sh463drmbd8q10e6m6ltakg77f7q696.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
            <Router>
              <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    </Routes>
                </main>
                <footer className="bg-[#2E1D1E] text-white py-5 text-center text-xs">
                    <div className="max-w-7xl mx-auto px-4">
                        <p>Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
                    </div>
                </footer>
              </div>
            </Router>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
