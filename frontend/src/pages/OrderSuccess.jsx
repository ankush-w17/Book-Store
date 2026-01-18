import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImage from '../assets/success.png'; // Assuming asset needs to be handled or we use a placeholder/emoji if image not available. 
// User provided image "uploaded_image_0.png" which looks like the success image. 
// I will assume for now we use a placeholder or verify if I can use the uploaded image path. 
// For this code, I'll use a standard layout matching the design.

const OrderSuccess = () => {
  const navigate = useNavigate();
  // Using a random order ID generator for display, or retrieving from state if passed
  const orderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-10 pb-20">
      <div className="text-center max-w-2xl px-4">
        {/* Placeholder for the confetti/star image from the design */}
        <div className="flex justify-center mb-6 text-4xl">
            🎉
        </div>
        
        <h1 className="text-2xl font-medium text-[#0A0102] mb-4">Order Placed Successfully</h1>
        
        <p className="text-sm text-[#0A0102] mb-10 text-center leading-relaxed">
          hurray!!! your order is confirmed <br/>
          the order id is #{orderId} save the order id for <br/>
          further communication..
        </p>
        
        <div className="w-full border border-[#E4E4E4] bg-[#FAFAFA] rounded-[1px] mb-10">
          <div className="grid grid-cols-3 border-b border-[#E4E4E4]">
             <div className="py-3 text-center text-xs font-medium text-[#0A0102] border-r border-[#E4E4E4]">Email us</div>
             <div className="py-3 text-center text-xs font-medium text-[#0A0102] border-r border-[#E4E4E4]">Contact us</div>
             <div className="py-3 text-center text-xs font-medium text-[#0A0102]">Address</div>
          </div>
           <div className="grid grid-cols-3">
             <div className="py-4 px-2 text-center text-xs text-[#0A0102] border-r border-[#E4E4E4] flex items-center justify-center">
                 admin@bookstore.com
             </div>
             <div className="py-4 px-2 text-center text-xs text-[#0A0102] border-r border-[#E4E4E4] flex items-center justify-center">
                 +91 8163475881
             </div>
             <div className="py-4 px-4 text-center text-xs text-[#0A0102] flex items-center justify-center">
                42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034
             </div>
          </div>
        </div>

        <button 
            onClick={() => navigate('/')} 
            className="bg-[#3371B5] text-white px-8 py-2.5 rounded-[2px] font-medium text-sm w-48 uppercase hover:bg-[#285a91] transition-colors"
        >
            Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
