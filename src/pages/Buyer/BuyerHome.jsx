import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Search, MapPin, Star, BadgeCheck, Filter } from 'lucide-react';

export default function BuyerHome() {
  const { products, farmers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Search */}
      <div className="bg-brand-600 text-white p-8 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">Find fresh products near you.</h1>
        <p className="flex items-center gap-2 text-brand-100 mb-6">
          <MapPin size={18} /> Nashik, Maharashtra
        </p>
        
        <div className="relative max-w-2xl">
          <input 
            type="text" 
            placeholder="Search vegetables, fruits, grains..."
            className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-brand-400 shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Products Near You</h2>
          <button className="flex items-center gap-2 text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
            <Filter size={16} /> Sort/Filter
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">No suitable products found within 10 km.</p>
            <button className="mt-4 text-brand-600 font-semibold hover:underline">
              Expanding search radius...
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const farmer = farmers.find(f => f.id === product.farmerId);
              return (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                  <div className="h-40 bg-gray-50 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300">
                    {product.image}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{product.condition} {product.name}</h3>
                      <span className="bg-brand-50 text-brand-700 px-2.5 py-1 rounded-lg font-bold">
                        ₹{product.price}/kg
                      </span>
                    </div>
                    
                    <div className="space-y-1 mb-4 flex-1">
                      <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
                        👨‍🌾 {farmer?.name}
                        {farmer?.verified && <BadgeCheck className="text-blue-500 w-4 h-4" />}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MapPin w={12} h={12}/> {farmer?.distance} km away</span>
                        <span className="flex items-center gap-1 text-yellow-500"><Star w={12} h={12} fill="currentColor" /> {farmer?.rating}</span>
                      </div>
                      <p className="text-xs text-brand-600 font-medium mt-1">Available: {product.quantity} kg</p>
                    </div>

                    <Link 
                      to={`/buyer/product/${product.id}`}
                      className="w-full block text-center bg-white border-2 border-brand-500 text-brand-600 hover:bg-brand-50 py-2.5 rounded-xl font-semibold transition-colors"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
