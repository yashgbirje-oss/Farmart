import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Trash2, AlertCircle, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Discover fresh products from nearby farmers.</p>
        <button 
          onClick={() => navigate('/buyer')}
          className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-brand-700 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Group items by farmer
  const itemsByFarmer = cart.reduce((acc, item) => {
    if (!acc[item.farmer.id]) {
      acc[item.farmer.id] = {
        farmer: item.farmer,
        items: [],
        subtotal: 0,
        deliveryFeasibility: true,
        deliveryFee: Math.round(item.farmer.distance * 8) // Mock delivery logic: ₹8 per km
      };
    }
    acc[item.farmer.id].items.push(item);
    acc[item.farmer.id].subtotal += (item.product.price * item.quantity);
    return acc;
  }, {});

  const farmerGroups = Object.values(itemsByFarmer);
  
  const productTotal = farmerGroups.reduce((sum, group) => sum + group.subtotal, 0);
  const deliveryTotal = farmerGroups.reduce((sum, group) => sum + group.deliveryFee, 0);
  const grandTotal = productTotal + deliveryTotal;

  const handleCheckout = () => {
    // Navigate to confirmation with a dummy order id
    const orderId = `AG${Math.floor(1000 + Math.random() * 9000)}`;
    navigate(`/buyer/order-confirmation/${orderId}`);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 mb-8 text-blue-800">
        <AlertCircle className="shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-semibold">Multi-Farmer Order System</p>
          <p className="text-sm opacity-90">One customer cart → Separate farmer-wise sub-orders. Delivery cost is calculated separately from the farmer's base product price based on distance and weight.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {farmerGroups.map((group, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <span>👨‍🌾 {group.farmer.name}</span>
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{group.farmer.distance} km</span>
                </div>
                <div className="text-sm font-medium text-gray-600">
                  Sub-order Total: <span className="text-gray-900">₹{group.subtotal}</span>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">₹{item.product.price}/kg × {item.quantity} kg</p>
                    </div>
                    <div className="font-bold text-gray-900 text-right min-w-[80px]">
                      ₹{item.product.price * item.quantity}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-100">
                  <span className="text-gray-500">Delivery via SmartLogistics</span>
                  <span className="font-semibold text-brand-600">+ ₹{group.deliveryFee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Product Total</span>
                <span className="font-semibold text-gray-900">₹{productTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Total</span>
                <span className="font-semibold text-brand-600">+ ₹{deliveryTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Platform Commission</span>
                <span className="font-bold text-green-500">₹0 (Zero)</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Grand Total</span>
                <span className="text-2xl font-extrabold text-gray-900">₹{grandTotal}</span>
              </div>
              <p className="text-xs text-gray-500 text-right mt-1">Inclusive of all taxes</p>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-500/30 transition-colors text-lg"
            >
              Place Order
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full mt-4 flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 font-medium py-2"
            >
              <Trash2 size={16} /> Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
