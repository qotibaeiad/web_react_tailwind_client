import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Link } from 'react-router-dom'; 

function ProfileNavbar({ darkSide, toggleDarkMode }) {
    return (
        <nav className="fixed top-0 w-full bg-gray-900 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-gray-900">
                <ul className="flex items-center justify-center flex-grow">
                    <li className="mr-6">
                        <Link to="/" className="text-white px-4 py-2 rounded-md hover:bg-gray-800">Home</Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-white px-4 py-2 rounded-md hover:bg-gray-800">Logout</Link>
                    </li>
                </ul>
                <div>
                    <DarkModeSwitch 
                        checked={darkSide} 
                        onChange={toggleDarkMode} 
                        className="w-10 text-white" // Apply dark mode text color
                    />
                </div>
            </div>
        </nav>
    );
}

export default ProfileNavbar;
