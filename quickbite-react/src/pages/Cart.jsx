import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useState } from 'react';

export default function Cart() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  if (!state) return (
    <main className="content" style={{ padding: 32 }}>
      <button className="back-btn-plain" onClick={() => navigate('/')}>← Back</button>
      <p style={{ marginTop: 24 }}>Your cart is empty.</p>
    </main>
  );

  const { cart, restaurant } = state;
  const items = restaurant.menu.filter((i) => cart[i.id]);
  const subtotal = items.reduce((s, i) => s + i.price * cart[i.id], 0);
  const delivery = 2.99;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    try {
      setPlacing(true);
      setError('');

      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString() || session.tokens?.accessToken?.toString();

      const payload = {
        restaurant: restaurant.title,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: cart[i.id],
        })),
        total,
      };

      const res = await fetch('https://j4kf1pats1.execute-api.us-east-1.amazonaws.com/prod/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to place order');
      }

      navigate('/order-confirmed');
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="content">
      <div className="cart-header">
        <button className="back-btn-plain" onClick={() => navigate(-1)}>← Back</button>
        <h2>Your Cart</h2>
        <span className="cart-restaurant-name">{restaurant.title}</span>
      </div>

      <section className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-img" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="cart-item-body">
              <strong>{item.name}</strong>
              <p>Qty: {cart[item.id]}</p>
            </div>
            <span className="cart-item-price">${(item.price * cart[item.id]).toFixed(2)}</span>
          </div>
        ))}
      </section>

      <section className="cart-summary">
        <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="summary-row"><span>Delivery fee</span><span>${delivery.toFixed(2)}</span></div>
        <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </section>

      {error && <p style={{ color: 'crimson', marginTop: 12 }}>{error}</p>}

      <button className="order-button place-order" onClick={placeOrder} disabled={placing}>
        {placing ? 'Placing Order...' : `Place Order · $${total.toFixed(2)}`}
      </button>
    </main>
  );
}
