import * as effects from "./effects.js";

export const shopItems = [
  {
    id: 1,
    name: "Slow Auto Clicker",
    cost: 10,
    valueRequired: 10,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(10),
      effects.increaseCps(1),
    ],
  },
  {
    id: 2,
    name: "Achievements",
    cost: 50,
    valueRequired: 20,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(50),
      (setTotalValue, setCurrentValue, setCps, setAchievementsVisible) => effects.unlockFeature(setAchievementsVisible)
    ],
  },
  {
    id: 3,
    name: "More Auto Clicks",
    cost: 100,
    valueRequired: 50,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(100),
      effects.increaseCps(5),
    ],
  },
  {
    id: 4,
    name: "Fishing",
    cost: 1000,
    valueRequired: 100,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(1000),
      effects.increaseCps(10),
    ],
  },
  {
    id: 5,
    name: "Item 5",
    cost: 10000,
    valueRequired: 1000,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(10000),
      effects.increaseCps(100),
    ],
  },
  {
    id: 6,
    name: "Item 6",
    cost: 100000,
    valueRequired: 10000,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(100000),
      effects.increaseCps(1000),
    ],
  },
  {
    id: 7,
    name: "Item 7",
    cost: 1000000,
    valueRequired: 100000,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(1000000),
      effects.increaseCps(10000),
    ],
  },
  {
    id: 8,
    name: "Item 8",
    cost: 10000000,
    valueRequired: 1000000,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(10000000),
      effects.increaseCps(100000),
    ],
  },
  {
    id: 9,
    name: "Item 9",
    cost: 100000000,
    valueRequired: 10000000,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(100000000),
      effects.increaseCps(1000000),
    ],
  },
  {
    id: 10,
    name: "Item 10",
    cost: 1000000000,
    valueRequired: 100000000,
    visible: true,
    effect: [
      effects.decreaseCurrentValue(1000000000),
      effects.increaseCps(10000000),
    ]
    }
];
