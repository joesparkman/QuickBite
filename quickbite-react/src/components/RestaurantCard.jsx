import { useNavigate } from 'react-router-dom';

export default function RestaurantCard({ item, wide = false }) {
  const navigate = useNavigate();
  return (
    <article
      className={wide ? 'restaurant-card wide' : 'restaurant-card'}
      onClick={() => navigate(`/restaurant/${item.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-image" style={{ backgroundImage: `url(${item.image})` }}>
        <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
        {!wide && <button className="heart-button" onClick={e => e.stopPropagation()}>♡</button>}
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <h3>{item.title}</h3>
          {wide && <span className="cuisine-tag">● {item.cuisine}</span>}
        </div>
        <p>{item.meta}</p>
        <div className="card-footer-row">
          <span>{item.type}</span>
          <span className="rating">⭐ {item.rating} <span className="reviews">({item.reviews.toLocaleString()})</span></span>
        </div>
      </div>
    </article>
  );
}