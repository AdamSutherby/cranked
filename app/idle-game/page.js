import IdleLogic from './idle-logic.js';
import Achievements from './achievements.js';
import { Title } from './title.js';

//trying to keep most the data off the page and in the components
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