import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const cuisines = ['Italian', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'Thai'];
const foods = ['Pizza', 'Sushi', 'Tacos', 'Curry', 'Noodles', 'Pad Thai'];
const prices = ['$', '$$', '$$$'];

const SlotReel = ({ items, spinning, result }: { items: string[], spinning: boolean, result: string }) => {
  return (
    <div className="relative h-20 w-32 bg-white rounded-lg shadow-inner overflow-hidden border-4 border-accent">
      <div className={`absolute w-full transition-transform duration-500 ${spinning ? 'animate-slot-spin' : ''}`}>
        {items.map((item, index) => (
          <div key={index} className="h-20 flex items-center justify-center text-xl font-bold text-primary">
            {item}
          </div>
        ))}
      </div>
      {!spinning && (
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary">
          {result}
        </div>
      )}
    </div>
  );
};

export const SlotMachine = () => {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState({ cuisine: cuisines[0], food: foods[0], price: prices[0] });
  const { toast } = useToast();

  const spin = () => {
    setSpinning(true);
    
    // Generate random results
    const newResults = {
      cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
      food: foods[Math.floor(Math.random() * foods.length)],
      price: prices[Math.floor(Math.random() * prices.length)]
    };

    // Stop spinning after 1 second
    setTimeout(() => {
      setSpinning(false);
      setResults(newResults);
      toast({
        title: "Your food recommendation is ready! 🎉",
        description: `How about some ${newResults.cuisine} ${newResults.food}? It's ${newResults.price} price range.`,
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-primary p-8 rounded-xl shadow-2xl">
        <div className="flex gap-4 mb-8">
          <SlotReel items={cuisines} spinning={spinning} result={results.cuisine} />
          <SlotReel items={foods} spinning={spinning} result={results.food} />
          <SlotReel items={prices} spinning={spinning} result={results.price} />
        </div>
        <Button 
          onClick={spin} 
          disabled={spinning}
          className="w-full bg-secondary hover:bg-secondary/90 text-xl font-bold py-6"
        >
          {spinning ? "Spinning..." : "SPIN!"}
        </Button>
      </div>
    </div>
  );
};