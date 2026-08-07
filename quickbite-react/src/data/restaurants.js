const API_URL = import.meta.env.VITE_API_URL;

export async function fetchRestaurants() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export const categories = [
  { emoji: '🍽️', label: 'All' },
  { emoji: '🍕', label: 'Pizza' },
  { emoji: '🍔', label: 'Burgers' },
  { emoji: '🍣', label: 'Sushi' },
  { emoji: '🍜', label: 'Asian' },
  { emoji: '☕', label: 'Coffee' },
  { emoji: '🥗', label: 'Healthy' },
  { emoji: '🧁', label: 'Desserts' },
];