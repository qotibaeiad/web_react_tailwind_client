import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Link } from 'react-router-dom'; 
import ProfileNavbar from './profileNavbar'; 
import ProfileCard from './ProfileCard'; 
import useDarkSide from './useDarkSide';

function Profile() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

     const toggleDarkMode = checked => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  if (darkSide) {
    document.body.classList.add('dark');
} else {
    document.body.classList.remove('dark');
}
    return (
        <div >
            {/* Profile Navbar */}
            <ProfileNavbar darkSide={darkSide} toggleDarkMode={toggleDarkMode} />

            {/* Profile Card */}
            <ProfileCard darkSide={darkSide} />
        </div>
    );
}

export default Profile;
