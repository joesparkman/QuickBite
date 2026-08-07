
import { useNavigate } from 'react-router-dom';

export default function OrderConfirmed() {
  const navigate = useNavigate();
  return (
    <main className="content confirm-screen">
      <div className="confirm-icon">🎉</div>
      <h2>Order Placed!</h2>
      <p>Your order is being prepared and will arrive in 25–35 min.</p>
      <button className="order-button" style={{ marginTop: 28 }} onClick={() => navigate('/')}>Back to Home</button>
    </main>
  );
}