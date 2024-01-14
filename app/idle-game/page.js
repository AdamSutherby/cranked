import React from 'react';
import IdleLogic from './idle-logic.js';
import { Title } from './title.js';

const App = () => {
  return (
    <main>
      <Title />
      <IdleLogic />
    </main>
  );
};

export default App;