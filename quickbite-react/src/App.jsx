import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import './styles.css';
import { AuthProvider, useAuth } from './auth/AuthContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Search from './pages/Search';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import Account from './pages/Account';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import OrderConfirmed from './pages/OrderConfirmed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Story from './pages/Story';
import ArchitectureDiagram from './pages/ArchitectureDiagram';

const HIDE_NAV = ['/cart', '/order-confirmed', '/login', '/signup'];

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/quickbite">
        <div className="app-shell">
          <div className="phone-frame">
            <header className="topbar">
              <div>
                <Link to="/" style={{ textDecoration: 'none' }}><h1>QuickBite</h1></Link>
              </div>
              <div className="top-icons">
                <button>🔔</button>
                <button>🛍️</button>
              </div>
            </header>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/order-confirmed" element={<ProtectedRoute><OrderConfirmed /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/story" element={<Story />} />
              <Route path="/story.html" element={<Story />} />
              <Route path="/architecture-diagram" element={<ArchitectureDiagram />} />
              <Route path="/architecture-diagram.html" element={<ArchitectureDiagram />} />
              <Route path="/index.html" element={<Home />} />
            </Routes>

            <NavGate hide={HIDE_NAV} />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

function NavGate({ hide }) {
  const { pathname } = useLocation();
  if (hide.some((p) => pathname === p)) return null;
  return <BottomNav />;
}
