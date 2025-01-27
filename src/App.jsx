import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import FocusTimer from './components/FocusTimer';
import Home from './components/Home';
import Tasks from './components/Tasks';
import EndScreen from './components/EndScreen';

const App = () => {
  const [tasks, setTasks] = useState([{ name: 'brush teeth', time: 10 }, { name: 'make bed', time: 20 }]);
  const  [finishTime, setFinishTime] = useState(new Date(Date.now() + tasks.reduce((acc, task) => task.name? acc + task.time * 60 * 1000: acc, 0)))

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} finishTime={finishTime} setFinishTime={setFinishTime}/>}>
          <Route index element={<Tasks tasks={tasks} setTasks={setTasks}/>} />
          <Route path="focus-timer" element={<FocusTimer />} />
          <Route path="end-screen" element={<EndScreen setFinishTime={setFinishTime} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
