import IdleLogic from './idle-logic.js';
import Achievements from './achievements.js';
import { Title } from './title.js';

const App = () => {
  
  return (
    <main>
      <Title />
      <IdleLogic />
      <Achievements />
    </main>
  );
};

export default App;