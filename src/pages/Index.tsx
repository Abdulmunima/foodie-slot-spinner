import { SlotMachine } from "@/components/SlotMachine";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Feeling Lucky? 🎰
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Spin the wheel to discover your next delicious meal! Our food recommendation slot machine will help you decide what to eat today.
          </p>
        </div>
        
        <SlotMachine />
        
        <div className="mt-16 text-center text-gray-600">
          <p className="text-sm">
            Keep spinning until you find your perfect meal! 🍽️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;