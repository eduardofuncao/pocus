import { useLocation, Link } from "react-router-dom"
import { useState, useEffect} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPause, faPlay, faX} from '@fortawesome/free-solid-svg-icons';



const FocusTimer = () => {
    const importedTasks = useLocation().state.filter(task => (task.name !== ''))
    const [tasks, setTasks] = useState(importedTasks)

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState({minutes: tasks[currentTaskIndex].time, seconds: 0});
    const [isPaused, setIsPaused] = useState(false);
    const [isLastTask, setIsLastTask] = useState(false);

    const updateTaskIndex = () => {
        const newTasks = [...tasks];
        newTasks[currentTaskIndex].time = currentTime.minutes;
        setTasks(newTasks);

        setCurrentTaskIndex((prevIndex) => {
          if (prevIndex + 1 < tasks.length) {
            return prevIndex + 1;
          }
          return 0;
        });
    };

    useEffect(() => {
        setCurrentTime({ minutes: tasks[currentTaskIndex].time, seconds: 0 });
        if (currentTaskIndex === tasks.length-1 ) {
            setIsLastTask(true);
        }
    }, [currentTaskIndex, tasks])

    useEffect(() => {
        let intervalId;
    
        const countdown = () => {
          if (isPaused) {
            return;
          }
          if ((currentTime.minutes > 0 || currentTime.seconds > 0)) {
            if (currentTime.seconds > 0) {
                setCurrentTime({ minutes: currentTime.minutes, seconds: currentTime.seconds - 1 });
            }
            if (currentTime.seconds === 0) {
                setCurrentTime({ minutes: currentTime.minutes - 1, seconds: 59 });
            }
            intervalId = setTimeout(countdown, 1000);
          } else { // tempo acaba
            updateTaskIndex();
          }
        };
    
        intervalId = setTimeout(countdown, 1000);
    
        return () => clearTimeout(intervalId);
      }, [currentTime, currentTaskIndex, tasks, isPaused, isLastTask]);

    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="flex flex-col items-center">
                <h3 className="text-gray-300 line-through">{tasks[currentTaskIndex-1]? tasks[currentTaskIndex-1].name +"'ed": <div></div>}</h3>
                <h2 className="text-4xl">{tasks[currentTaskIndex].name}'ing</h2>
                <h3 className="text-gray-300">{tasks[currentTaskIndex+1]? 'will ' + tasks[currentTaskIndex+1].name: 'will finish'}</h3>
                <p className="text-7xl">{String(currentTime.minutes).padStart(2, '0')} : {String(currentTime.seconds).padStart(2, '0')}</p>
                <div className="text-gray-500">
                    {isLastTask || tasks.length === 1 ? 
                    <Link to="/end-screen" className="btn btn-ghost">
                        <FontAwesomeIcon icon={faCheck} size="xl" />
                    </Link>
                    :
                    <button onClick={() => updateTaskIndex()} className="btn btn-ghost">
                        <FontAwesomeIcon icon={faCheck} size="xl" />
                    </button>
                    }
                    
                    <button onClick={() => setIsPaused(!isPaused)} className="btn btn-ghost">
                        {isPaused ? <FontAwesomeIcon icon={faPlay} size="xl" /> : <FontAwesomeIcon icon={faPause} size="xl" />}
                    </button>
                    <Link to="/" className="btn btn-ghost">
                        <FontAwesomeIcon icon={faX} size="xl" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FocusTimer