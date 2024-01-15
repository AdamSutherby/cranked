export const decreaseCurrentValue = (amount) => {
    return (setTotalValue, setCurrentValue, setCps) => {
      setCurrentValue((currentValue) => currentValue - amount);
    };
  };
  
  export const increaseCps = (amount) => {
    return (setTotalValue, setCurrentValue, setCps) => {
      setCps((cps) => cps + amount);
    };
  };
  
  export const unlockFeature = (setFeatureState) => {
    return () => {
      setFeatureState(true);
    };
  };