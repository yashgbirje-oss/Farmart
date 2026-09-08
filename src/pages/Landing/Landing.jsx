import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight, Tractor, Store } from 'lucide-react';
import WhyKisanConnect from '../../components/WhyKisanConnect';

export default function Landing() {
  const navigate = useNavigate();
  const { setUserRole } = useAppContext();

  const handleStart = (role) => {
    setUserRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-50"></div>
        <div className="relative px-6 py-20 lg:px-12 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            From Farm to Market, <span className="text-brand-600">Directly.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
            A hyperlocal zero-commission marketplace connecting farmers directly with consumers and businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleStart('farmer')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              <Tractor size={24} />
              Start as Farmer
            </button>
            <button
              onClick={() => handleStart('buyer')}
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-brand-500 hover:text-brand-600 text-gray-800 text-lg font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-3"
            >
              <Store size={24} />
              Start as Buyer
            </button>
          </div>
        </div>
      </div>

      <WhyKisanConnect />

      {/* How it Works Section */}
      <div className="bg-gray-900 text-white rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 transform -translate-y-1/2"></div>
          
          {['Farmer Lists', 'Nearby Buyer Discovers', 'Order Placed', 'Smart Delivery', 'Community Rating'].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center z-10 w-full md:w-1/5">
              <div className="w-16 h-16 bg-gray-800 border-4 border-gray-900 rounded-full flex items-center justify-center text-xl font-bold text-brand-400 mb-4 shadow-xl">
                {idx + 1}
              </div>
              <p className="font-medium text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
