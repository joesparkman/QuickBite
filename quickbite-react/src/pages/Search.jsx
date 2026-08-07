import { useState, useMemo, useEffect } from 'react';
import { fetchRestaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants().then(data => setRestaurants(data));
  }, []);

  const results = useMemo(
    () =>
      restaurants.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase())
      ),
    [query, restaurants]
  );

  return (
    <section className="content">
      <h2 style={{ margin: '8px 0 14px' }}>Search</h2>

      <section className="search-bar interactive">
        <span className="search-icon">🔎</span>
        <input
          autoFocus
          placeholder="Search for restaurants or cuisines"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <button onClick={() => setQuery('')}>✕</button>}
      </section>

      <section className="restaurant-list" style={{ marginTop: 16 }}>
        {results.map((item) => (
          <RestaurantCard key={item.id} item={item} wide />
        ))}
      </section>
    </section>
  );
}