import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UploadFilePopup from './UploadFilePopup';


function Header({handleLastUpdatedChange}) {
    return (
        <header className='bg-white flex justify-between px-5 py-3'>
            <h1>CAI Test</h1>
            <nav>
                <ul>
                    <li>
                        {/* <div>Popup content here !!</div> */}
                        <UploadFilePopup handleLastUpdatedChange={handleLastUpdatedChange} />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;