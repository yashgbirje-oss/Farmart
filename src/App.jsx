import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import Layout from './components/Layout';

// Pages
import Landing from './pages/Landing/Landing';
import FarmerDashboard from './pages/Farmer/FarmerDashboard';
import AddProduct from './pages/Farmer/AddProduct';
import BuyerHome from './pages/Buyer/BuyerHome';
import ProductDetails from './pages/Buyer/ProductDetails';
import Cart from './pages/Buyer/Cart';
import OrderConfirmation from './pages/Buyer/OrderConfirmation';
import OrderTracking from './pages/Buyer/OrderTracking';
import Rating from './pages/Buyer/Rating';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            
            {/* Farmer Routes */}
            <Route path="farmer" element={<FarmerDashboard />} />
            <Route path="farmer/add-product" element={<AddProduct />} />
            
            {/* Buyer Routes */}
            <Route path="buyer" element={<BuyerHome />} />
            <Route path="buyer/product/:id" element={<ProductDetails />} />
            <Route path="buyer/cart" element={<Cart />} />
            <Route path="buyer/order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="buyer/tracking/:id" element={<OrderTracking />} />
            <Route path="buyer/rating/:id" element={<Rating />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
