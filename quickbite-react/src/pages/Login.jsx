import { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getCurrentUser } from 'aws-amplify/auth';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn({ username: email, password });
      const user = await getCurrentUser();
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="content" style={{ padding: '32px 20px' }}>
      <h2 style={{ marginBottom: 8 }}>Welcome back</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Sign in to your QuickBite account</p>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15 }}
        />
        {error && <p style={{ color: 'red', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="order-button" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
        Don't have an account?{' '}
        <span style={{ color: '#ff6b35', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
          Sign up
        </span>
      </p>
    </main>
  );
}
