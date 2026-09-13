import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Plus, TrendingUp, Package, IndianRupee, Flame, CheckCircle, MessageSquare } from 'lucide-react';

export default function FarmerDashboard() {
  const { products } = useAppContext();
  
  // Filter products for farmer f1 (Ramesh Patil) as mock active user
  const farmerProducts = products.filter(p => p.farmerId === 'f1');

  const [orders, setOrders] = useState([
    { id: 'ORD-2023', type: 'retail', item: 'Fresh Tomato', qty: '15 kg', price: '₹28/kg', status: 'Pending', buyer: 'Local Restaurant' },
    { id: 'BULK-8091', type: 'bulk', item: 'Stored Onion', qty: '5 tons', price: '₹26/kg (Expected)', status: 'Action Required', buyer: 'Mumbai Wholesaler' },
  ]);

  const handleAction = (id, actionText) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: actionText } : o));
    alert(actionText + ' successful for ' + id);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good Evening, Farmer Ramesh 👨‍🌾</h1>
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
            <p className="text-2xl font-bold text-gray-900">&#8377;4,250</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Products Sold</p>
            <p className="text-2xl font-bold text-gray-900">42 tons</p>
          </div>
        </div>
      </div>

      {/* Incoming Orders & Quotes */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Incoming Orders & Bulk Quotes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className={`p-4 border-b ${order.type === 'bulk' ? 'bg-orange-50 border-orange-100' : 'bg-gray-50 border-gray-100'} flex justify-between items-center`}>
                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${order.type === 'bulk' ? 'bg-orange-200 text-orange-800' : 'bg-gray-200 text-gray-800'}`}>
                  {order.type === 'bulk' ? 'Bulk Quote Request' : 'Retail Order'}
                </span>
                <span className="text-sm font-semibold text-gray-500">{order.id}</span>
              </div>
              <div className="p-5 flex-1">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{order.item}</h3>
                  <span className="font-bold text-gray-900">{order.qty}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Buyer: {order.buyer}</p>
                <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Price / Rate:</span>
                  <span className="font-bold text-brand-600">{order.price}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-4">Status: <span className={order.status.includes('Pending') || order.status.includes('Required') ? 'text-orange-500' : 'text-green-600'}>{order.status}</span></p>
                
                {order.status === 'Pending' || order.status === 'Action Required' ? (
                  <div className="flex gap-2 mt-auto">
                    {order.type === 'bulk' ? (
                      <>
                        <button onClick={() => handleAction(order.id, 'Quote Accepted')} className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                          <CheckCircle size={16} /> Accept
                        </button>
                        <button onClick={() => handleAction(order.id, 'Negotiating')} className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                          <MessageSquare size={16} /> Negotiate
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleAction(order.id, 'Order Accepted')} className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> Accept Order
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-auto pt-2 border-t border-gray-100 text-center text-sm text-gray-500">
                    Action Completed
                  </div>
                )}
              </div>
            </div>
          ))}
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
                  <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                    <p className="text-brand-600 font-semibold flex items-center gap-1">
                      &#8377;{p.price} <span className="text-sm text-gray-500 font-normal">/kg</span>
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
                  <span>Available Stock:</span>
                  <span className="font-medium text-gray-900">{p.quantity} tons</span>
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
