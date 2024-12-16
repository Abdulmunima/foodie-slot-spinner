import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNearbyRestaurants, Restaurant } from '../services/yelpService';

const SlotReel = ({ items, spinning, result, type }: { items: Restaurant[], spinning: boolean, result: Restaurant, type: string }) => {
  const getDisplayText = (item: Restaurant) => {
    switch(type) {
      case 'name':
        return item.name;
      case 'cuisine':
        return item.cuisine;
      case 'rating':
        return `${item.rating}★`;
      default:
        return item.price;
    }
  };

  return (
    <div className="relative h-20 w-48 bg-white rounded-lg shadow-inner overflow-hidden border-4 border-accent">
      <div className={`absolute w-full transition-transform duration-500 ${spinning ? 'animate-slot-spin' : ''}`}>
        {items.map((item, index) => (
          <div key={index} className="h-20 flex items-center justify-center text-xl font-bold text-primary">
            {getDisplayText(item)}
          </div>
        ))}
      </div>
      {!spinning && (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary">
          {getDisplayText(result)}
        </div>
      )}
    </div>
  );
};

export const SlotMachine = () => {
  const { restaurants, loading, error } = useNearbyRestaurants();
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState<Restaurant | null>(null);
  const { toast } = useToast();

  if (loading) {
    return <div className="text-center">Loading restaurants...</div>;
  }

  if (error) {
    toast({
      title: "Notice",
      description: error,
      variant: "destructive",
    });
  }

  const spin = () => {
    if (restaurants.length === 0) return;
    
    setSpinning(true);
    
    // Generate random result
    const newResult = restaurants[Math.floor(Math.random() * restaurants.length)];

    // Stop spinning after 1 second
    setTimeout(() => {
      setSpinning(false);
      setResults(newResult);
      toast({
        title: "Your restaurant recommendation is ready! 🎉",
        description: `How about ${newResult.name}? It's a ${newResult.rating}★ rated ${newResult.cuisine.toLowerCase()} restaurant in the ${newResult.price} price range.${newResult.location ? ` Located at ${newResult.location.address1}, ${newResult.location.city}.` : ''}`,
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-primary p-8 rounded-xl shadow-2xl">
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <SlotReel items={restaurants} spinning={spinning} result={results || restaurants[0]} type="name" />
          <SlotReel items={restaurants} spinning={spinning} result={results || restaurants[0]} type="cuisine" />
          <SlotReel items={restaurants} spinning={spinning} result={results || restaurants[0]} type="rating" />
        </div>
        <Button 
          onClick={spin} 
          disabled={spinning}
          className="w-full bg-secondary hover:bg-secondary/90 text-xl font-bold py-6"
        >
          {spinning ? "Spinning..." : "FIND A RESTAURANT!"}
        </Button>
      </div>
    </div>
  );
};