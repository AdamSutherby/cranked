"use client";

import { useState, useEffect } from 'react';
import { shopItems } from './shop-items.js';
import Achievements, { achievementData } from './achievements.js';

export default function IdleLogic() {
  const [totalValue, setTotalValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [cps, setCps] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [shopVisible, setShopVisible] = useState(false);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [item2Purchased, setItem2Purchased] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);

  // visibility of the achievements window
  const handleCloseAchievements = () => {
    setAchievementsVisible(false);
  };

  const handleOpenAchievements = () => {
    setAchievementsVisible(true);
  };

  // uniform shop button width
  const updateButtonWidth = () => {
    setButtonWidth(Math.floor(window.innerWidth / 10));
  };

    // Click value logic
  useEffect(() => {
    const clickValueInterval = setInterval(() => {
      // Calculate clickValue based on the number of completed achievements
      const completedAchievements = achievementData.filter((achievement) => achievement.completed);
      const clickValueBoost = completedAchievements.length * 5;
  
      // Update clickValue with the boosted value, or set it to 1 if the boost is zero
      setClickValue((prevClickValue) => (clickValueBoost > 0 ? clickValueBoost : 1));
    }, 100);
  
    return () => {
      clearInterval(clickValueInterval);
      window.removeEventListener('resize', updateButtonWidth);
    };
  }, []);
  
  // Click Per Second logic
  useEffect(() => {
    const cpsInterval = setInterval(() => {
      setCurrentValue((prev) => prev + cps);
      setTotalValue((prev) => prev + cps);
    }, 1000);

    return () => {
      clearInterval(cpsInterval);
    };
  }, [cps]);

  useEffect(() => {
    // Run this code only on the client side
    updateButtonWidth();

    // Initial calculation
    window.addEventListener('resize', updateButtonWidth);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateButtonWidth);
    };
  }, []); // Empty dependency array ensures the effect runs once on mount

  // Achievement logic
  useEffect(() => {
    // Check for Achievement 2 completion
    if (totalValue >= 500) {
      updateAchievement(2);
    }

    // Check for Achievement 3 completion
    if (totalValue >= 5000) {
      updateAchievement(3);
    }
  }, [totalValue]);

  const updateAchievement = (achievementId) => {
    achievementData.forEach((achievement) => {
      if (achievement.id === achievementId) {
        achievement.completed = true;
      }
    });
  };

    // Shop logic
  const handlePurchase = (item) => {
    if (currentValue >= item.cost && item.visible) {
      item.effect.forEach((effect) => effect(setTotalValue, setCurrentValue, setCps, setAchievementsVisible));
      item.visible = false;
      if (item.id === 2) {
        setItem2Purchased(true);
        updateAchievement(1);
      }
    } else {
      alert(`You need at least ${item.cost} total value to purchase ${item.name}!`);
    }
  };
  // Method that handles the click event
  const handleClick = () => {
    setCurrentValue((prev) => prev + clickValue);
    setTotalValue((prev) => prev + clickValue);

    if (totalValue + 1 >= 10) {
      setShopVisible(true);
    }
  };

  const visibleShopItems = shopItems.filter((item) => item.valueRequired <= totalValue && item.visible);

  return (
    <div>
      <div className="absolute top-0 left-0 flex flex-col items-start m-2">
        <p>Total: {totalValue}</p>
        <p>Current: {currentValue}</p>
        <p>CPS: {cps}</p>
      </div>
      <div className="flex justify-center">
        <button onClick={handleClick} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full m-4">
          Click me
        </button>
      </div>
  
      {shopVisible && (
        <div className="flex flex-col">
          {visibleShopItems.map((item) => (
            <div key={item.name} className={`w-${buttonWidth} p-4`}>
              <button
                onClick={() => handlePurchase(item)}
                className="relative overflow-hidden rounded-md"
                style={{
                  width: `${buttonWidth}px`,
                  background: `linear-gradient(to right, #38B2AC ${Math.min((currentValue / item.cost) * 100, 100)}%, #1F2937 0%)`
                }}
              >
                <div className="text-xl font-bold mb-2 text-center">{item.name}</div>
                <div className="text-white-600 mb-4 text-center">Cost: {item.cost}</div>
                <div className="w-full bg-teal-500 rounded-full h-4 absolute bottom-0" style={{ width: `${Math.min((currentValue / item.cost) * 100, 100)}%` }}></div>
              </button>
            </div>
          ))}
        </div>
      )}
      {item2Purchased && (
        <div className="absolute top-0 right-0 flex justify-end">
          <button onClick={handleOpenAchievements} className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4">
            Achievements
          </button>
        </div>
      )}
      <Achievements isVisible={achievementsVisible} onClose={handleCloseAchievements} />
    </div>
  );
}
