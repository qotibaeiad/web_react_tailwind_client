import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Link } from 'react-router-dom'; 
import ProfileNavbar from './profileNavbar'; 
import ProfileCard from './ProfileCard'; 
import useDarkSide from './useDarkSide';
import Savenews from './savenews';
function Profile() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = checked => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <div style={{ backgroundColor: darkSide ? '#1F2937' : '#F3F4F6', minHeight: '100vh' }}>
            {/* Profile Navbar */}
            <ProfileNavbar darkSide={darkSide} toggleDarkMode={toggleDarkMode} />
            <div style={{ backgroundColor: darkSide ? '#374151' : '#E5E7EB', height: '1px' }}></div>
            <div className="px-4"> 
                <ProfileCard darkSide={darkSide} />
            </div>
        </div>
    );
}

export default Profile;
