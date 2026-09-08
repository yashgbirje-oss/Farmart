import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Plus, TrendingUp, Package, IndianRupee, Flame } from 'lucide-react';

export default function FarmerDashboard() {
  const { products } = useAppContext();
  
  // Filter products for farmer f1 (Ramesh Patil) as mock active user
  const farmerProducts = products.filter(p => p.farmerId === 'f1');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good Evening, Farmer 👋</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1">📍 Nashik, Maharashtra</p>
        </div>
        <Link 
          to="/farmer/add-product"
          className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          List New Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Products</p>
            <p className="text-2xl font-bold text-gray-900">{farmerProducts.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">New Orders</p>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-brand-100 p-3 rounded-xl text-brand-600">
            <IndianRupee size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Today's Sales</p>
            <p className="text-2xl font-bold text-gray-900">₹4,250</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Products Sold</p>
            <p className="text-2xl font-bold text-gray-900">42 kg</p>
          </div>
        </div>
      </div>

      {/* My Products */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Active Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerProducts.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl bg-gray-50 p-2 rounded-xl">{p.image}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                    <p className="text-brand-600 font-semibold flex items-center gap-1">
                      ₹{p.price} <span className="text-sm text-gray-500 font-normal">/kg</span>
                    </p>
                  </div>
                </div>
                {p.name === 'Tomato' && (
                  <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Flame size={12} /> High Demand
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 border-t border-gray-50 pt-4">
                <div className="flex justify-between">
                  <span>Available:</span>
                  <span className="font-medium text-gray-900">{p.quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Radius:</span>
                  <span className="font-medium text-gray-900">{p.radius} km</span>
                </div>
              </div>
              
              <div className="mt-5 flex gap-2">
                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm transition-colors border border-gray-200">
                  Edit
                </button>
                <button className="flex-1 bg-brand-50 hover:bg-brand-100 text-brand-700 py-2 rounded-lg font-medium text-sm transition-colors border border-brand-200">
                  Boost
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
