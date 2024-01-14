"use client";

import { useState, useEffect } from 'react';
import { shopItems } from './shop-items.js';

export default function IdleLogic() {
  const [totalValue, setTotalValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [cps, setCps] = useState(0);
  const [clickValue, setClickValue] = useState(1)
  const [shopVisible, setShopVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalValue((prevTotal) => prevTotal + cps);
      setCurrentValue((prevCurrent) => prevCurrent + cps);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cps]);

  const handlePurchase = (item) => {
    if (currentValue >= item.cost && item.visible) {
      item.effect(setTotalValue, setCurrentValue, setCps);
      item.visible = false;
    } else {
      alert(`You need at least ${item.cost} total value to purchase ${item.name}!`);
    }
  };

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
      <p>Total Value: {totalValue}</p>
      <p>Current Value: {currentValue}</p>
      <p>CPS: {cps}</p>
      <button onClick={handleClick}>Click me</button>

      {/* Upgrade elements */}
      {shopVisible && (
        <div>
          <p>Upgrade Shop:</p>
          {visibleShopItems.map((item) => (
            <div key={item.name}>
              <p>Name: {item.name}</p>
              <p>Cost: {item.cost} total value</p>
              <button onClick={() => handlePurchase(item)}>Purchase {item.name}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}