import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const restaurants = [
  {
    name: 'The Hungry Chef',
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
  }
];

const SlotReel = ({ items, spinning, result, type }: { items: any[], spinning: boolean, result: any, type: string }) => {
  const getDisplayText = (item: any) => {
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
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState(restaurants[0]);
  const { toast } = useToast();

  const spin = () => {
    setSpinning(true);
    
    // Generate random result
    const newResult = restaurants[Math.floor(Math.random() * restaurants.length)];

    // Stop spinning after 1 second
    setTimeout(() => {
      setSpinning(false);
      setResults(newResult);
      toast({
        title: "Your restaurant recommendation is ready! 🎉",
        description: `How about ${newResult.name}? It's a ${newResult.rating}★ rated ${newResult.cuisine.toLowerCase()} restaurant in the ${newResult.price} price range.`,
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-primary p-8 rounded-xl shadow-2xl">
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <SlotReel items={restaurants} spinning={spinning} result={results} type="name" />
          <SlotReel items={restaurants} spinning={spinning} result={results} type="cuisine" />
          <SlotReel items={restaurants} spinning={spinning} result={results} type="rating" />
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