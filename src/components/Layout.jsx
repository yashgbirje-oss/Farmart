import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart, User, Package, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Layout() {
  const { userRole, setUserRole, cart } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to={userRole === 'farmer' ? '/farmer' : userRole === 'buyer' ? '/buyer' : '/'} className="flex items-center gap-2" onClick={() => { if(!userRole) navigate('/')}}>
            <div className="bg-brand-500 text-white p-1.5 rounded-lg">
              <Leaf size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Farmart</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            {userRole === 'farmer' && (
              <>
                <Link to="/farmer" className="text-gray-600 hover:text-brand-600 text-sm font-medium">Dashboard</Link>
                <Link to="/farmer/add-product" className="text-gray-600 hover:text-brand-600 text-sm font-medium">Add Product</Link>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
                  <LogOut size={20} />
                </button>
              </>
            )}

            {userRole === 'buyer' && (
              <>
                <Link to="/buyer" className="text-gray-600 hover:text-brand-600 text-sm font-medium">Explore</Link>
                <Link to="/buyer/cart" className="relative text-gray-600 hover:text-brand-600">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
                  <LogOut size={20} />
                </button>
              </>
            )}

            {!userRole && (
              <>
                <Link to="/admin" className="text-gray-500 hover:text-gray-900 text-sm font-medium">Admin</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
