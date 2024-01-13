// shop.js

"use client";

import { useState } from 'react';
import { shopItems } from './shop-items.js';

const Shop = ({ totalValue, setCurrentValue, setCps }) => {
  const [purchasedItems, setPurchasedItems] = useState([]);

  const handlePurchase = (item) => {
    if (totalValue >= item.cost && item.visible && !purchasedItems.includes(item.id)) {
      item.effect(setCurrentValue, setCps); // Apply the item's effect
      setPurchasedItems((prevItems) => [...prevItems, item.id]);

      // Toggle the visibility of the purchased item, so it can't be purchased again
      shopItems.forEach((shopItem) => {
        if (shopItem.id === item.id) {
          shopItem.visible = false;
        }
      });
    } else if (!item.visible) {
      alert(`You've already purchased ${item.name}!`);
    } else {
      alert(`You need at least ${item.cost} total value to purchase ${item.name}!`);
    }
  };

  // Filter shop items based on valueRequired and totalValue
  const visibleShopItems = shopItems.filter((item) => item.valueRequired <= totalValue && item.visible);

  return (
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
  );
};

export default Shop;
