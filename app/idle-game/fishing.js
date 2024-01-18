import { useState, useEffect } from 'react';

const FishingGame = ({ fishingLevel, onClose, onFishCaught, handleLevelUp }) => {
  const [currentFish, setCurrentFish] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const catchFish = () => {
    if (currentFish) {
      onFishCaught(currentFish);
      setCurrentFish(null);
    }
  };

  const startFishing = (handleLevelUp) => {
    const fishes = [
      { id: 1, name: 'Tuna', EXP: 50, value: 25, rarity: 40, wait: 25000, reaction: 10000, requiredLevel: 1 },
      { id: 2, name: 'Swordfish', EXP: 70, value: 50, rarity: 25, wait: 50000, reaction: 8000, requiredLevel: 1 },
      { id: 3, name: 'Salmon', EXP: 25, value: 75, rarity: 20, wait: 75000, reaction: 6000, requiredLevel: 3 },
      { id: 4, name: 'Shark', EXP: 50, value: 100, rarity: 10, wait: 100000, reaction: 5000, requiredLevel: 5 },
      { id: 5, name: 'Whale', EXP: 100, value: 250, rarity: 5, wait: 200000, reaction: 4000, requiredLevel: 10 },
      { id: 6, name: 'Kraken', EXP: 250, value: 500, rarity: 1, wait: 300000, reaction: 3000, requiredLevel: 15},
      { id: 7, name: 'Super Hell Fish', EXP: 500, value: 1000, rarity: 1, wait: 500000, reaction: 2000, requiredLevel: 20},
      { id: 8, name: 'Super Duper Hell Fish', EXP: 1000, value: 5000, rarity: 1, wait: 1000000, reaction: 1000, requiredLevel: 25},
      { id: 9, name: 'Wumbo Fish', EXP: 5000, value: 10000, rarity: 1, wait: 2000000, reaction: 1000, requiredLevel: 30},
      { id: 10, name: 'Wumbo-er Fish', EXP: 10000, value: 50000, rarity: 1, wait: 5000000, reaction: 1050, requiredLevel: 35}
    ];

    const userFishPool = fishes.filter(fish => fish.requiredLevel <= fishingLevel);
    console.log('Available Fishes:', userFishPool.map(fish => fish.name));
    const totalWeight = fishes.reduce((sum, fish) => sum + fish.rarity, 0);
    let randomWeight = Math.floor(Math.random() * totalWeight);


    const randomFish = () => {
        const totalWeight = userFishPool.reduce((sum, fish) => sum + fish.rarity, 0);
        let randomWeight = Math.floor(Math.random() * totalWeight);

        return userFishPool.find(fish => {
            randomWeight -= fish.rarity;
            return randomWeight < 0;
          });
        };

        const currentFish = randomFish();

    console.log('Current Fish:', currentFish);

    setCurrentFish(currentFish);

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
        console.log('Hiding fish...');
        setCurrentFish(null);
  
        // Set a new timeout for the next fishing attempt
        const nextTimeoutId = setTimeout(() => {
          console.log('Next fishing attempt...');
          startFishing();
        }, currentFish.wait * (0.5 + Math.random()));
  
        setTimeoutId(nextTimeoutId);
      }, currentFish.reaction);
  
      setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        console.log('Fishing game mounted');
        const delay = 10000; // 10 seconds in milliseconds
    
        // Start fishing after the initial delay
        const initialTimeoutId = setTimeout(() => {
          startFishing();
        }, delay);
    
        // Clean up the initial timeout when the component is unmounted
        return () => {
          clearTimeout(initialTimeoutId);
    
          // Clear the ongoing timeout when the component is unmounted
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      }, [fishingLevel]);

      useEffect(() => {
        // Cleanup the previous timeout when a new version of the fishing minigame is started
        return () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      }, [timeoutId]);

  return (
    <div className="container absolute bottom-0 right-0 m-2 bg-blue-300 p-4" style={{ width: '15%', height: '15%' }} onClick={catchFish}>
      {currentFish && (
        <div>
          <p className='flex items-start justify-center text-black'>{currentFish.name}</p>
          <p className='flex items-start justify-center text-6xl content-center'> 🐟 </p>
        </div>
      )}
    </div>
  );
};

export default FishingGame;
