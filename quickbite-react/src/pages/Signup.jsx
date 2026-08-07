import { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signUp({ username: email, password, options: { userAttributes: { email } } });
      setStep('confirm');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirm') return (
    <main className="content" style={{ padding: '32px 20px' }}>
      <h2 style={{ marginBottom: 8 }}>Check your email</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>We sent a confirmation code to {email}</p>
      <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          placeholder="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15 }}
        />
        {error && <p style={{ color: 'red', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="order-button" disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm Account'}
        </button>
      </form>
    </main>
  );

  return (
    <main className="content" style={{ padding: '32px 20px' }}>
      <h2 style={{ marginBottom: 8 }}>Create account</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Join QuickBite today</p>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15 }}
        />
        {error && <p style={{ color: 'red', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="order-button" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
        Already have an account?{' '}
        <span style={{ color: '#ff6b35', cursor: 'pointer' }} onClick={() => navigate('/login')}>
          Sign in
        </span>
      </p>
    </main>
  );
}
