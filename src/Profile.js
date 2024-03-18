import React, { useState, useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProfileNavbar from './profileNavbar'; 
import ProfileCard from './ProfileCard'; 
import useDarkSide from './useDarkSide';
import Savenews from './savenews';
import { ipAddress } from './App';

function Profile() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);
    const [articles, setArticles] = useState([]);
    const username = localStorage.getItem('loggedInUser');


    useEffect(() => {
        // Fetch articles from the server with the username included in the query parameters
        fetch(`http://${ipAddress}:3000/api/FavoriteArticle/?username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setArticles(data.articles);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }, [username, ipAddress]);

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
                
                <div className="w-full md:w-8/12 mx-2 h-64">
                
                    {/* About Section */}
                    <div className="bg-white p-3 shadow-sm rounded-sm dark:bg-gray-800 dark:text-white">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 dark:bg-slate-600 dark:text-white">
                            <div className="fel flex-col">
                                <div className="tracking-wide border-b-2 border-black font-bold">Saved News</div>
                                {/* Conditional rendering based on articles availability */}
                                {articles.length === 0 ? (
                                    <div className="my-4">No articles available</div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {articles.map((article, index) => (
                                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                                <a href={article.url}>
                                                    <img alt="Placeholder" className="block h-48 w-full object-cover md:h-64 lg:h-48" src={article.urlToImage} />
                                                </a>
                                                <div className="p-4">
                                                    <h1 className="text-lg font-semibold">
                                                        <a className="no-underline hover:underline text-black dark:text-white" href={article.url}>
                                                            {article.title}
                                                        </a>
                                                    </h1>
                                                    <p className="text-grey-darker text-sm mt-2">
                                                        {article.publishedAt}
                                                    </p>
                                                    <div className="flex items-center mt-4">
                                                        <a className="flex items-center no-underline hover:underline text-black" href={article.author}>
                                                            <h3 className="dark:text-white">Author</h3>
                                                            <p className="ml-2 text-sm dark:text-white">
                                                                {article.author}
                                                            </p>
                                                        </a>
                                                        <a className="no-underline text-grey-darker hover:text-red-dark ml-auto" href="#">
                                                            <span className="hidden">Like</span>
                                                            <i className="fa fa-heart"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
