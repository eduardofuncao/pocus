import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

const Tasks = ({tasks, setTasks}) => {

    const handleNameChange = (event, index) => {
        const newTasks = [...tasks];
        newTasks[index].name = event.target.value;
        if (index === tasks.length - 1 && event.target.value !== '') {
            newTasks.push({ name: '', time: 10 });
        }

        setTasks(newTasks);
    };

    const handleTimeChange = (event, index) => {
        const newTasks = [...tasks];
        newTasks[index].time = event.target.value? parseInt(event.target.value.slice(0, 2)): 0;
        setTasks(newTasks);
    };

    const increaseTimer = (event, index) => {
        event.preventDefault();
        const newTasks = [...tasks];
        if (newTasks[index].time + 5 >= 99) {
            newTasks[index].time = 99;
        } else {
            newTasks[index].time += 5;
        }
        setTasks(newTasks);
    };

    const decreaseTimer = (event, index) => {
        event.preventDefault();
        const newTasks = [...tasks];
        if (newTasks[index].time - 5 <= 1) {
            newTasks[index].time = 1;
        } else {
            newTasks[index].time -= 5;
        }
        setTasks(newTasks);
    };

    return (
        <main className='flex-grow flex flex-col justify-center items-center leading-loose'>
            <h2 className='text-4xl text-center mb-2'>What is your focus for today?</h2>
            <form action="">
                {tasks.map((task, index) => (
                
                
                
                <motion.div initial={{x:-100}} animate={{x: 0}} key={index} >
                    <input className='mr-4 border-b w-72 focus:outline-none'
                    type="text"
                    placeholder={task.name} 
                    onChange={(event) => handleNameChange(event, index)}
                    />
                    <input 
                    className="[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 w-12 focus:outline-none"
                    type="number" 
                    placeholder='10 min' 
                    value={task.time}
                    onChange={(event) => handleTimeChange(event, index)}
                    />
                    <div className='inline-block -ml-2 mr-2'>min</div>
                    <div className='inline-block  rounded-full px-2 text-gray-300'>
                        <button className='hover:text-black' onClick={(event) => decreaseTimer(event, index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <button className='ml-3 hover:text-black' onClick={(event) => increaseTimer(event, index)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </motion.div>
                ))}
                <div className="flex justify-center mt-8">
                    <Link to="/focus-timer"  state={tasks} className='btn btn-neutral mt-16 text-white'>Enter Pocus Session</Link>
                </div>
            </form>
        </main>
    )
}

export default Tasks