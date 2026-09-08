import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { BrainCircuit, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AddProduct() {
  const navigate = useNavigate();
  const { products, setProducts } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: 'Tomato',
    category: 'Vegetables',
    quantity: 120,
    minOrder: 5,
    price: 28,
    radius: 15,
    condition: 'Fresh'
  });

  const [showAI, setShowAI] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  const handleRecommend = () => {
    setAiAnalyzing(true);
    setShowAI(true);
    setTimeout(() => {
      setAiAnalyzing(false);
    }, 1500);
  };

  const handleChangePrice = (newPrice) => {
    setFormData({ ...formData, price: newPrice });
    setShowAI(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProd = {
      ...formData,
      id: `p${Date.now()}`,
      farmerId: 'f1', // Mocking Ramesh Patil
      image: formData.name === 'Tomato' ? '🍅' : (formData.name === 'Onion' ? '🧅' : '📦')
    };
    setProducts([newProd, ...products]);
    navigate('/farmer');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">List New Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Grains</option>
                  <option>Pulses</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Qty (kg)</label>
                <input 
                  type="number" 
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Order (kg)</label>
                <input 
                  type="number" 
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  value={formData.minOrder}
                  onChange={(e) => setFormData({...formData, minOrder: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Price (₹/kg)</label>
                <input 
                  type="number" 
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none font-semibold text-lg"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Radius (km)</label>
                <input 
                  type="number" 
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  value={formData.radius}
                  onChange={(e) => setFormData({...formData, radius: Number(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="condition" 
                    checked={formData.condition === 'Fresh'}
                    onChange={() => setFormData({...formData, condition: 'Fresh'})}
                    className="text-brand-600 focus:ring-brand-500"
                  />
                  <span>Fresh</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="condition" 
                    checked={formData.condition === 'Stored'}
                    onChange={() => setFormData({...formData, condition: 'Stored'})}
                    className="text-brand-600 focus:ring-brand-500"
                  />
                  <span>Stored</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button" 
                onClick={handleRecommend}
                className="flex-1 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <BrainCircuit size={20} />
                Get AI Price Recommendation
              </button>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-semibold shadow-md transition-colors"
            >
              List Product
            </button>
          </form>
        </div>

        {/* AI Assistant Panel */}
        <div>
          {showAI ? (
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-xl h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BrainCircuit size={120} />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BrainCircuit className="text-purple-300" /> AI Price Assistant
              </h2>
              
              {aiAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-purple-200 animate-pulse">Analyzing local market data...</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-purple-200 text-sm mb-1">Your Price</p>
                      <p className="text-2xl font-bold text-gray-200">₹{formData.price}/kg</p>
                    </div>
                    <div className="bg-purple-500/30 border border-purple-400/50 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-purple-100 text-sm mb-1">Recommended Local</p>
                      <p className="text-2xl font-bold text-white">₹26 – ₹31/kg</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-purple-200">Market Demand</span>
                      <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-sm font-bold">🔥 HIGH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Nearby Average</span>
                      <span className="font-semibold">₹29/kg</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-purple-200 mb-2">Reasoning:</p>
                    <ul className="space-y-2 text-sm text-purple-100">
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-400" /> Strong nearby demand for Fresh Tomatoes</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-400" /> 3 similar local listings found</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-400" /> Seasonal demand pattern peaking</li>
                    </ul>
                  </div>

                  <div className="mt-auto pt-6 space-y-3">
                    <button 
                      onClick={() => handleChangePrice(29)}
                      className="w-full bg-white text-purple-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                    >
                      Use Recommended ₹29/kg
                    </button>
                    <button 
                      onClick={() => setShowAI(false)}
                      className="w-full bg-transparent border border-white/30 text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                    >
                      Keep My Price (₹{formData.price})
                    </button>
                    <p className="text-center text-xs text-purple-300 mt-2 flex items-center justify-center gap-1">
                      <AlertCircle size={12} /> AI provides recommendations. You control the final price.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100 h-full flex flex-col items-center justify-center text-center text-purple-800 opacity-70">
              <BrainCircuit size={64} className="mb-4 text-purple-300" />
              <h3 className="text-xl font-bold mb-2">AI Price Assistant</h3>
              <p className="text-purple-600 text-sm">Click "Get AI Price Recommendation" to analyze real-time hyperlocal market data and optimize your selling price.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
