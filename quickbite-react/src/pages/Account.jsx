import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <section className="content" style={{ padding: '24px 20px' }}>
      <h2 style={{ marginBottom: 24 }}>My Account</h2>

      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <p style={{ color: '#888', fontSize: 13, marginBottom: 4 }}>Signed in as</p>
        <p style={{ fontWeight: 600, fontSize: 16 }}>
          {user?.signInDetails?.loginId || user?.username}
        </p>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: 12 }}>Quick Links</p>
        <p
          style={{
            color: '#555',
            padding: '8px 0',
            borderBottom: '1px solid #f0f0f0',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/orders')}
        >
          📋 My Orders
        </p>
        <p
          style={{ color: '#555', padding: '8px 0', cursor: 'pointer' }}
          onClick={() => navigate('/favorites')}
        >
          💖 My Favorites
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: 14,
          borderRadius: 12,
          border: 'none',
          background: '#ff6b35',
          color: '#fff',
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        Sign Out
      </button>
    </section>
  );
}