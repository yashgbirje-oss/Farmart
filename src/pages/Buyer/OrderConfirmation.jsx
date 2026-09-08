import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function OrderConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, clearCart, addOrder } = useAppContext();

  // Create order on mount and clear cart
  useEffect(() => {
    if (cart.length > 0) {
      addOrder({
        id,
        items: cart,
        date: new Date().toISOString(),
        status: 'Placed'
      });
      clearCart();
    }
  }, [cart, id, addOrder, clearCart]);

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={48} className="text-green-500" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-500 text-lg mb-8">Thank you for supporting local farmers.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-left mb-8">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <span className="text-gray-500">Order ID</span>
          <span className="font-bold text-gray-900">#{id}</span>
        </div>
        
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <span className="text-gray-500">Expected Delivery</span>
          <span className="font-bold text-gray-900">Tomorrow, 11:30 AM</span>
        </div>

        <p className="text-sm text-gray-500 text-center mb-4">You will receive notifications as farmers accept your order.</p>

        <button 
          onClick={() => navigate(`/buyer/tracking/${id}`)}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          Track Order <ArrowRight size={20} />
        </button>
      </div>

      <button 
        onClick={() => navigate('/buyer')}
        className="text-brand-600 font-semibold hover:underline"
      >
        Return to Home
      </button>
    </div>
  );
}
