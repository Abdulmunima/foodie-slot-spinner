import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const featuredRestaurants = [
  {
    name: "The Hungry Chef",
    cuisine: "Contemporary American",
    description: "Farm-to-table dining experience with seasonal menus",
    rating: "4.8/5"
  },
  {
    name: "Sushi Master",
    cuisine: "Japanese",
    description: "Authentic sushi and traditional Japanese dishes",
    rating: "4.7/5"
  },
  {
    name: "La Piazza",
    cuisine: "Italian",
    description: "Handmade pasta and wood-fired pizzas",
    rating: "4.9/5"
  }
];

const FeaturedPlaces = () => {
  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Featured Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredRestaurants.map((restaurant, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary">{restaurant.name}</CardTitle>
              <CardDescription className="text-secondary">{restaurant.cuisine}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{restaurant.description}</p>
              <p className="text-sm font-semibold">Rating: {restaurant.rating}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPlaces;