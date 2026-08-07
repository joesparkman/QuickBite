import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: '🏠', label: 'Home', path: '/' },
  { icon: '🔎', label: 'Search', path: '/search' },
  { icon: '📋', label: 'Orders', path: '/orders' },
  { icon: '💖', label: 'Favorites', path: '/favorites' },
  { icon: '👤', label: 'Account', path: '/account' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={location.pathname === item.path ? 'nav-item active' : 'nav-item'}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}