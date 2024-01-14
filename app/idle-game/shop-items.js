export const shopItems = [
    {
      id: 1,
      name: "Item 1",
      cost: 10,
      valueRequired: 10,
      visible: true,
      effect: (setTotalValue, setCurrentValue, setCps) => {
        setCurrentValue((currentValue) => currentValue - 10);
        setCps((cps) => cps + 1);
      },
    },
    {
      id: 2,
      name: "Item 2",
      cost: 20,
      valueRequired: 20,
      visible: true,
      // Add more items as needed
    },
    // Add more items as needed
  ];
  