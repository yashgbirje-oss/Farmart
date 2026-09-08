import { ShieldAlert, Users, Package, AlertOctagon, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function AdminDashboard() {
  const { farmers, products } = useAppContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Platform overview and verification center.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Farmers', value: farmers.length, icon: <Users /> },
          { label: 'Total Buyers', value: '1,248', icon: <Users /> },
          { label: 'Active Products', value: products.length, icon: <Package /> },
          { label: 'Orders Today', value: '142', icon: <TrendingUp /> },
          { label: 'Complaints', value: '3', icon: <AlertOctagon className="text-red-500"/> },
          { label: 'Marketplace Value', value: '₹1.2L', icon: <TrendingUp /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="text-gray-400 mb-4">{stat.icon}</div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Center */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Farmer Verification</h2>
            <div className="flex gap-4 text-sm font-medium">
              <span className="text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Pending: 3</span>
              <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full">Verified: 248</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Kisan Rao', doc: 'Aadhar & Land Records', date: '2 hours ago' },
              { name: 'Anil Patil', doc: 'Aadhar', date: '5 hours ago' },
              { name: 'Ganesh Farm', doc: 'FSSAI & Land Records', date: '1 day ago' },
            ].map((pending, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                    {pending.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{pending.name}</h3>
                    <p className="text-xs text-gray-500">Docs: {pending.doc} • {pending.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <XCircle size={24} />
                  </button>
                  <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                    <CheckCircle size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints / Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ShieldAlert className="text-red-500" /> Active Alerts
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="font-bold text-red-800 text-sm mb-1">Quality Complaint (#AG1024)</p>
              <p className="text-xs text-red-600 mb-3">Buyer reported damaged tomatoes from Ramesh Patil.</p>
              <button className="text-xs font-bold text-red-700 underline">Review Evidence</button>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
              <p className="font-bold text-orange-800 text-sm mb-1">Suspicious Price Alert</p>
              <p className="text-xs text-orange-600">Product price listed 80% below local average.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
