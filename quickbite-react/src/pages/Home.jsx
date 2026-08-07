import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchRestaurants, categories } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import SectionHeader from '../components/SectionHeader';

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants().then(data => setRestaurants(data));
  }, []);

  const popular = restaurants.slice(0, 3);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const asianCuisines = ['ramen', 'thai', 'asian', 'japanese', 'chinese', 'korean', 'vietnamese'];
      const coffeeCuisines = ['coffee', 'cafe', 'drinks', 'smoothie', 'juice'];
      const dessertCuisines = ['dessert', 'bakery', 'ice cream', 'sweets', 'cake'];

      const matchCat =
        activeCategory === 'All' ||
        (activeCategory === 'Asian'
          ? asianCuisines.some(c => r.cuisine.toLowerCase().includes(c))
          : activeCategory === 'Coffee'
          ? coffeeCuisines.some(c => r.cuisine.toLowerCase().includes(c))
          : activeCategory === 'Desserts'
          ? dessertCuisines.some(c => r.cuisine.toLowerCase().includes(c))
          : r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()));

      const matchQ =
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase());

      return matchCat && matchQ;
    });
  }, [activeCategory, query, restaurants]);

  return (
    <section className="content">
      <div className="project-page-links">
        <Link className="project-page-link active" to="/">App</Link>
        <Link className="project-page-link" to="/story">Story</Link>
        <Link className="project-page-link" to="/architecture-diagram">Visual Diagram</Link>
        <a className="project-page-link" href="/">Back to Portfolio</a>
      </div>

      <section className="address-card interactive">
        <div className="address-left">
          <div className="pin">📍</div>
          <div>
            <strong>Deliver to Home</strong>
            <p>123 Main St, Anytown, CA</p>
          </div>
        </div>
        <span className="chevron">⌄</span>
      </section>

      <section className="search-bar interactive">
        <span className="search-icon">🔎</span>
        <input
          placeholder="Search for restaurants or cuisines"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="filter-button" onClick={() => setQuery('')}>
            ✕
          </button>
        )}
      </section>

      <section className="categories-row">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={activeCategory === cat.label ? 'category-item active' : 'category-item'}
            onClick={() => setActiveCategory(cat.label)}
          >
            <span className="category-icon">{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </section>

      {!query && (
        <section className="promo-card">
          <div className="promo-copy">
            <h2>Free delivery</h2>
            <p>On your first order</p>
            <span>Over $15</span>
            <button className="order-button" onClick={() => navigate('/search')}>
              Order now
            </button>
          </div>
          <div className="promo-visual">
            <div className="bag">🍔🥡</div>
          </div>
        </section>
      )}

      {!query && (
        <>
          <SectionHeader title="Popular near you" to="/search" />
          <section className="horizontal-cards">
            {popular.map((item) => (
              <RestaurantCard key={item.id} item={item} />
            ))}
          </section>

          <section className="quickpass interactive">
            <div className="quickpass-icon">Q</div>
            <div>
              <strong>QuickPass</strong>
              <p>Lower delivery fees. Always.</p>
            </div>
            <span className="chevron">›</span>
          </section>
        </>
      )}

      <SectionHeader title={query ? `Results for "${query}"` : 'All restaurants'} to="/search" />

      {filtered.length === 0 ? (
        <p style={{ color: '#888', padding: '16px 0' }}>
          No restaurants found. Try a different search.
        </p>
      ) : (
        <section className="restaurant-list">
          {filtered.map((item) => (
            <RestaurantCard key={item.id} item={item} wide />
          ))}
        </section>
      )}
    </section>
  );
}
