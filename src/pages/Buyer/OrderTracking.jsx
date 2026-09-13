import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Package, Truck, CheckCircle2, Clock, Star, MapPin } from 'lucide-react';

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useAppContext();
  
  // Find the order, if not found, use a mock one for demo purposes
  const order = orders.find(o => o.id === id) || {
    id,
    items: [
      { product: { name: 'Tomato', price: 28, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80' }, quantity: 5, farmer: { id: 'f1', name: 'Ramesh Patil' } },
      { product: { name: 'Onion', price: 32, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80' }, quantity: 5, farmer: { id: 'f2', name: 'Suresh Farm' } }
    ]
  };

  const steps = [
    { label: 'Order Placed', icon: <Package size={20} />, active: true, completed: true },
    { label: 'Farmer Accepted', icon: <CheckCircle2 size={20} />, active: true, completed: true },
    { label: 'Preparing Product', icon: <Package size={20} />, active: true, completed: false },
    { label: 'Pickup Arranged', icon: <Truck size={20} />, active: false, completed: false },
    { label: 'In Transit', icon: <Truck size={20} />, active: false, completed: false },
    { label: 'Delivered', icon: <MapPin size={20} />, active: false, completed: false },
  ];

  // Group items by farmer for tracking
  const itemsByFarmer = order.items.reduce((acc, item) => {
    if (!acc[item.farmer.id]) {
      acc[item.farmer.id] = { farmer: item.farmer, items: [] };
    }
    acc[item.farmer.id].items.push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Track Order</h1>
          <p className="text-gray-500 mt-1">Order #{id}</p>
        </div>
        <button 
          onClick={() => navigate(`/buyer/rating/${id}`)}
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
        >
          <Star size={16} /> Rate Order (Demo)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {Object.values(itemsByFarmer).map((group, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <span className="font-semibold text-gray-900">🚜 Sub-order: {group.farmer.name}</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">
                  {idx === 0 ? 'Preparing' : 'Pickup Arranged'}
                </span>
              </div>
              <div className="p-6">
                <div className="flex gap-4 mb-8">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0"><img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" /></div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} kg</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 -z-10"></div>
                  <div className="space-y-6">
                    {steps.map((step, stepIdx) => (
                      <div key={stepIdx} className={`flex items-start gap-4 ${step.active ? '' : 'opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          step.completed ? 'bg-brand-500 text-white shadow-sm' : 
                          step.active ? 'bg-brand-100 text-brand-600 border-2 border-brand-500' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                        }`}>
                          {step.icon}
                        </div>
                        <div>
                          <p className={`font-medium ${step.completed || step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</p>
                          {step.completed && <p className="text-xs text-gray-500 mt-1">10:45 AM</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Delivery Details</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="text-brand-500 mt-1"><MapPin size={20} /></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                  <p className="text-sm text-gray-500">123 Green Valley, Panchavati, Nashik, 422003</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-blue-500 mt-1"><Clock size={20} /></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                  <p className="text-sm text-gray-500">Tomorrow, by 11:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
