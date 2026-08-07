import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRestaurants } from '../data/restaurants';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchRestaurants().then(data => {
      const found = data.find((r) => r.id === Number(id));
      setRestaurant(found);
    });
  }, [id]);

  if (!restaurant) return <div className="content" style={{ padding: 32 }}>Loading...</div>;

  const addToCart = (item) => {
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };
  const removeFromCart = (item) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[item.id] > 1) next[item.id]--;
      else delete next[item.id];
      return next;
    });
  };

  const menu = restaurant.menu || [];
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = menu.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  return (
    <main className="content detail-content">
      <div className="detail-hero" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <span className={`badge ${restaurant.badgeClass}`} style={{ position: 'static', alignSelf: 'flex-start', marginTop: 'auto' }}>
          {restaurant.badge}
        </span>
      </div>

      <div className="detail-info">
        <div className="detail-title-row">
          <div>
            <h2>{restaurant.title}</h2>
            <p className="detail-meta">{restaurant.type} • {restaurant.meta}</p>
          </div>
          <div className="detail-rating">
            <span>⭐ {restaurant.rating}</span>
            <span className="reviews">({restaurant.reviews.toLocaleString()})</span>
          </div>
        </div>
        <p className="detail-desc">{restaurant.description}</p>
      </div>

      <h3 className="menu-heading">Menu</h3>
      <section className="menu-list">
        {menu.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-img" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="menu-item-body">
              <strong>{item.name}</strong>
              <p>{item.desc}</p>
              <div className="menu-item-footer">
                <span className="item-price">${item.price.toFixed(2)}</span>
                <div className="qty-controls">
                  {cart[item.id] ? (
                    <>
                      <button className="qty-btn" onClick={() => removeFromCart(item)}>−</button>
                      <span className="qty-val">{cart[item.id]}</span>
                    </>
                  ) : null}
                  <button className="qty-btn add" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {totalItems > 0 && (
        <div className="cart-footer">
          <button
            className="cart-checkout-btn"
            onClick={() => navigate('/cart', { state: { cart, restaurant } })}
          >
            <span className="cart-qty-badge">{totalItems}</span>
            View Cart · ${totalPrice.toFixed(2)}
          </button>
        </div>
      )}
    </main>
  );
}
