import { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const session = await fetchAuthSession();
        const token =
          session.tokens?.idToken?.toString() ||
          session.tokens?.accessToken?.toString();

        const res = await fetch(
          'https://j4kf1pats1.execute-api.us-east-1.amazonaws.com/prod/orders',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to load orders');
        }

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <section className="content" style={{ padding: 32 }}>
      <h2>Your Orders</h2>

      {loading && <p style={{ marginTop: 16 }}>Loading orders...</p>}
      {!loading && error && <p style={{ marginTop: 16, color: 'crimson' }}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p style={{ marginTop: 16 }}>
          No past orders yet. Place your first order to see it here!
        </p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <strong>{order.restaurant || 'QuickBite Order'}</strong>
                <span>${Number(order.total || 0).toFixed(2)}</span>
              </div>
              <p style={{ marginTop: 8, color: '#666' }}>
                {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}
              </p>
              <p style={{ marginTop: 8, color: '#444' }}>
                {Array.isArray(order.items)
                  ? order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')
                  : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
