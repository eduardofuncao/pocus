import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPause, faPlay, faX, faRotateLeft} from '@fortawesome/free-solid-svg-icons';
import { KoFiDialog, KoFiButton, KoFiWidget, KoFiPanel } from "react-kofi";
import "react-kofi/dist/styles.css";
import { useEffect } from 'react';

const EndScreen = ({setFinishTime}) => {
    
    useEffect(() => {
        setFinishTime(new Date(Date.now()))
    }, [])

    return (
        <div className="flex flex-col flex-grow justify-center items-center">
            <div className='text-5xl'>Congrats!</div>
            <div className='text-3xl mt-2'>Your session is over</div>
            <div className='text-gray-500 flex items-center'>
                <Link to='/' className='btn btn-ghost'>
                    <FontAwesomeIcon icon={faRotateLeft} size='xl' />
                </Link>
            <KoFiDialog
                color="#2b3440"
                textColor="#fff"
                id="eduardofuncao"
                label="Buy me a Cookie"
                padding={0}
                width={400}
                iframe={false}
                buttonRadius="8px"
            />
            </div>
        </div>
    )
}

export default EndScreen