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
        <div style={{ backgroundColor: darkSide ? '#1F2937' : '#F3F4F6', minHeight: '200vh' }}>

            <ProfileNavbar darkSide={darkSide} toggleDarkMode={toggleDarkMode} />

            <div style={{ backgroundColor: darkSide ? '#374151' : '#E5E7EB', height: '1px' }}></div>
            <ProfileCard darkSide={darkSide} />
            <div className="px-4 flex flex-col md:flex-row-reverse md:items-start mt-0">
                
                <div className="w-full md:w-8/12 mx-2 h-64  ">
                
                    {/* About Section */}
                    <div className="bg-white p-3 shadow-sm rounded-sm dark:bg-gray-800 dark:text-white">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 dark:bg-slate-600 dark:text-white">
                            <div className="fel flex-col">
                                <div className="tracking-wide border-b-2 border-black font-bold">Saved News</div>
                                {/* the 6 cards code */}
                                <div>
                                    <div className="container my-12 mx-auto px-4 md:px-12">
                                        <div className="flex flex-wrap -mx-1 lg:-mx-4">

                                            {/* Column */}
                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                                                {/* Article */}
                                                <article className="overflow-hidden rounded-lg shadow-lg">

                                                    <a href="#">
                                                        <img alt="Placeholder" className="block h-48 w-full object-cover" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/EWS_Company-train_Cottrell.jpg" />

                                                    </a>

                                                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                                        <h1 className="text-lg">
                                                            <a className="no-underline hover:underline text-black dark:text-white" href="#">
                                                                Brand new route
                                                            </a>
                                                        </h1>
                                                        <p className="text-grey-darker text-sm">
                                                            3/1/24
                                                        </p>
                                                    </header>

                                                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                                        <a className="flex items-center no-underline hover:underline text-black" href="#">
                                                            <h3 className="dark:text-white">Author</h3>
                                                            <p className="ml-2 text-sm dark:text-white">
                                                                Edward grown
                                                            </p>
                                                        </a>
                                                        <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                                            <span className="hidden">Like</span>
                                                            <i className="fa fa-heart"></i>
                                                        </a>
                                                    </footer>

                                                </article>
                                                {/* END Article */}

                                            </div>
                                            {/* END Column */}

                                            {/* Column */}
                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                                                {/* Article */}
                                                <article className="overflow-hidden rounded-lg shadow-lg">

                                                    <a href="#">
                                                        <img alt="Placeholder" className="block h-48 w-full object-cover" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Qatar_-_Japan%2C_AFC_Asian_Cup_2019_56.jpg" />
                                                    </a>

                                                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                                        <h1 className="text-lg">
                                                            <a className="no-underline hover:underline text-black dark:text-white" href="#">
                                                                Qatar win Asia cup
                                                            </a>
                                                        </h1>
                                                        <p className="text-grey-darker text-sm">
                                                            10/2/24
                                                        </p>
                                                    </header>

                                                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                                        <a className="flex items-center no-underline hover:underline text-black" href="#">
                                                            <h3 className="dark:text-white">Author</h3>
                                                            <p className="ml-2 text-sm dark:text-white">
                                                                Ahmed Khalifa
                                                            </p>
                                                        </a>
                                                        <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                                            <span className="hidden">Like</span>
                                                            <i className="fa fa-heart"></i>
                                                        </a>
                                                    </footer>

                                                </article>
                                                {/* END Article */}

                                            </div>
                                            {/* END Column */}

                                            {/* Column */}
                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                                                {/* Article */}
                                                <article className="overflow-hidden rounded-lg shadow-lg">

                                                    <a href="#">
                                                        <img alt="Placeholder" className="block h-48 w-full object-cover" src="https://www.the-sun.com/wp-content/uploads/sites/6/2022/09/iphone-15-op.jpg?strip=all&quality=100&w=1920&h=1080&crop=1" />
                                                    </a>

                                                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                                        <h1 className="text-lg">
                                                            <a className="no-underline hover:underline text-black dark:text-white" href="#">
                                                                IPhone 15 release date
                                                            </a>
                                                        </h1>
                                                        <p className="text-grey-darker text-sm">
                                                            9/2/24
                                                        </p>
                                                    </header>

                                                    <footer className="flex items-center justify-between leading-none p-2 md:p-4 ">
                                                        <a className="flex items-center no-underline hover:underline text-black" href="#">
                                                            <h3 className="dark:text-white">Author</h3>
                                                            <p className="ml-2 text-sm dark:text-white">
                                                                Steve Kali
                                                            </p>
                                                        </a>
                                                        <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                                            <span className="hidden">Like</span>
                                                            <i className="fa fa-heart"></i>
                                                        </a>
                                                    </footer>

                                                </article>
                                                {/* END Article */}

                                            </div>
                                            {/* END Column */}

                                            {/* Column */}
                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
               
            </div>
        </div>
    );
}
export default Profile;
