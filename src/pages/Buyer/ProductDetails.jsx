import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, Star, BadgeCheck, MapPin, Truck, Plus, Minus, ShoppingCart, Info, X } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, farmers, addToCart } = useAppContext();
  
  const product = products.find(p => p.id === id);
  const farmer = product ? farmers.find(f => f.id === product.farmerId) : null;
  
  const [qty, setQty] = useState(product?.minOrder || 1);
  const [showBulkModal, setShowBulkModal] = useState(false);

  if (!product || !farmer) return <div className="text-center py-20 text-xl font-bold">Product not found</div>;

  const handleAdd = () => {
    addToCart(product, qty);
    navigate('/buyer/cart');
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/buyer/cart');
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setShowBulkModal(false);
    alert('Bulk quote request sent to the farmer successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium">
        <ArrowLeft size={20} /> Back to discovery
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center min-h-[300px] overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{product.condition} {product.name}</h1>
            <span className="text-3xl font-extrabold text-brand-600">&#8377;{product.price}<span className="text-lg text-gray-500 font-medium">/kg</span></span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">Available Stock: {product.quantity} tons</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">Min Order: {product.minOrder} kg</span>
            <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-medium">Bulk Min Order: 1 ton</span>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-gray-900 uppercase text-xs tracking-wider">Farmer Details</h3>
            <div className="flex items-center justify-between bg-brand-50 rounded-xl p-4 border border-brand-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-brand-200">
                  👨‍🌾
                </div>
                <div>
                  <p className="font-bold text-gray-900 flex items-center gap-1">
                    {farmer.name} <BadgeCheck className="text-blue-500 w-4 h-4" />
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-0.5">
                    <span className="flex items-center gap-1 text-yellow-500 font-medium"><Star w={14} h={14} fill="currentColor" /> {farmer.rating}/5</span>
                    <span className="flex items-center gap-1"><MapPin w={14} h={14}/> {farmer.distance} km away</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <Truck size={16} className="text-brand-500"/> Delivery radius: {product.radius} km
            </div>
          </div>

          <div className="mt-auto">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Retail Quantity (kg)</label>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                <button 
                  className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 disabled:opacity-50"
                  onClick={() => setQty(Math.max(product.minOrder, qty - 1))}
                  disabled={qty <= product.minOrder}
                >
                  <Minus size={20} />
                </button>
                <span className="w-16 text-center font-bold text-lg text-gray-900">{qty}</span>
                <button 
                  className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 disabled:opacity-50"
                  onClick={() => setQty(Math.min(product.quantity * 1000, qty + 1))}
                  disabled={qty >= product.quantity * 1000}
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                Total: &#8377;{qty * product.price}
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <button 
                onClick={handleAdd}
                className="flex-1 bg-white border-2 border-brand-500 text-brand-600 hover:bg-brand-50 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-brand-600 border-2 border-brand-600 text-white hover:bg-brand-700 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30"
              >
                Buy Now
              </button>
            </div>
            <button 
              onClick={() => setShowBulkModal(true)}
              className="w-full bg-gray-800 border-2 border-gray-800 text-white hover:bg-gray-900 py-4 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Info size={20} /> Request Bulk Quote
            </button>
          </div>
        </div>
      </div>

      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Request Bulk Quote</h2>
              <button onClick={() => setShowBulkModal(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleBulkSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Quantity (tons)</label>
                <input type="number" min="1" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="e.g. 5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹/kg)</label>
                <input type="number" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" placeholder={`Current retail: &#8377;${product.price}/kg`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Location</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="City or Pincode" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message to Farmer</label>
                <textarea rows="3" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Any special requirements?"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors mt-2">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
