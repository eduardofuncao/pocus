import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Home = ({tasks, setTasks, finishTime, setFinishTime}) => {


    const updateFinishedTime = () => {
        setFinishTime(new Date(Date.now() + tasks.reduce((acc, task) => task.name? acc + task.time * 60 * 1000: acc, 0)))
    }

    useEffect(() => {
        updateFinishedTime()
    }, [tasks])
        

    return (
        <div className="App font-quando flex flex-col h-screen">
        <nav className='navbar mt-4'>
            <div className='flex-1 ml-12'>
            <div className='text-5xl font-medium mt-4 mr-1'>Pocus</div>
            <div className='rounded-full w-6 h-6 bg-black'></div>
            </div>
            <div className='flex flex-col flex-none items-center mr-6'>
                <div className=''>Finish by</div>
                <div className='text-4xl'>{String(finishTime.getHours()).padStart(2, '0')}:{String(finishTime.getMinutes()).padStart(2, '0')}</div>
            </div>
        </nav>
        <Outlet></Outlet>
        
        

        <footer className="footer flex">
        </footer>
        </div>)
}

export default Home