import { useState, useEffect } from 'react';

export interface Restaurant {
  name: string;
  cuisine: string;
  price: string;
  rating: string;
  image_url?: string;
  url?: string;
  location?: {
    address1: string;
    city: string;
  };
}

export const useNearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_YELP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          params: {
            term: 'restaurants',
            location: 'auto', // This will use the user's location
            sort_by: 'rating',
            limit: 10,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }

        const data = await response.json();
        const formattedRestaurants = data.businesses.map((business: any) => ({
          name: business.name,
          cuisine: business.categories[0]?.title || 'Various',
          price: business.price || '$$',
          rating: business.rating.toString(),
          image_url: business.image_url,
          url: business.url,
          location: {
            address1: business.location.address1,
            city: business.location.city,
          },
        }));

        setRestaurants(formattedRestaurants);
      } catch (err) {
        setError('Failed to load restaurants. Using fallback data.');
        // Fallback data in case of API failure
        setRestaurants([
          {
            name: 'Local Favorite',
            cuisine: 'American',
            price: '$$',
            rating: '4.8'
          },
          {
            name: 'Sushi Master',
            cuisine: 'Japanese',
            price: '$$$',
            rating: '4.7'
          },
          {
            name: 'La Piazza',
            cuisine: 'Italian',
            price: '$$',
            rating: '4.9'
          },
          {
            name: 'Taj Palace',
            cuisine: 'Indian',
            price: '$$',
            rating: '4.6'
          },
          {
            name: 'Dragon Wok',
            cuisine: 'Chinese',
            price: '$',
            rating: '4.5'
          },
          {
            name: 'Thai Spice',
            cuisine: 'Thai',
            price: '$$',
            rating: '4.7'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
};
