import React from 'react';

function Header() {
    return (
        <header className='bg-white flex justify-between px-5 py-3'>
            <h1>CAI Test</h1>
            <nav>
                <ul>
                    <li>
                        <button className='flex items-center'>
                            <p className='px-2'>Upload</p>
                            <i id='upload-icon' className="fa-solid fa-cloud-arrow-up"></i>
                        </button>
                    </li>
                    <li>
                        <p></p>
                        <i></i>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;