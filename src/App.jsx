import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import FocusTimer from './components/FocusTimer';
import Home from './components/Home';
import Tasks from './components/Tasks';
import EndScreen from './components/EndScreen';

function App() {

  const [tasks, setTasks] = useState([{ name: 'brush teeth', time: 10 }, { name: 'make bed', time: 20 }]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} />}>
          <Route index element={<Tasks tasks={tasks} setTasks={setTasks}/>} />
          <Route path="focus-timer" element={<FocusTimer />} />
          <Route path="end-screen" element={<EndScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
