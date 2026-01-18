import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
            <Routes>
            <Route path="/" element={<Home />} />
            </Routes>
        </main>
        <footer className="bg-[#2E1D1E] text-white py-5 text-center text-xs">
            <div className="max-w-7xl mx-auto px-4">
                <p>Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
            </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
