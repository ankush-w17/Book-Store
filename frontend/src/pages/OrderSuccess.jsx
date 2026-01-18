import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImage from '../assets/success.png'; 

const OrderSuccess = () => {
  const navigate = useNavigate();
  
  const orderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-10 pb-20">
      <div className="text-center max-w-2xl px-4">
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
                 ankush@bookstore.com
             </div>
             <div className="py-4 px-2 text-center text-xs text-[#0A0102] border-r border-[#E4E4E4] flex items-center justify-center">
                 +91 8791859640
             </div>
             <div className="py-4 px-4 text-center text-xs text-[#0A0102] flex items-center justify-center">
                SRM, Chennai
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
