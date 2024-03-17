import React, { useState, useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Link } from 'react-router-dom';
import ProfileNavbar from './profileNavbar';
import ProfileCard from './ProfileCard';
import useDarkSide from './useDarkSide';
import { ipAddress } from './App';

function Profile() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const name=localStorage.getItem('name')
        console.log(name)
        fetchArticles(name);
    }, []);

    const fetchArticles = async (username) => {
        try {
            const response = await fetch(`http://${ipAddress}:3000/api/articles/${username}`);
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setArticles(data.articles);
                } else {
                    console.warn('Response is not JSON:', await response.text());
                    // Handle the case where the response is not JSON, e.g., by displaying an error message
                }
            } else {
                throw new Error('Failed to fetch articles');
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const toggleDarkMode = checked => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <div style={{ backgroundColor: darkSide ? '#1F2937' : '#F3F4F6', minHeight: '200vh'}}>
            <ProfileNavbar darkSide={darkSide} toggleDarkMode={toggleDarkMode} />
            <div style={{ backgroundColor: darkSide ? '#374151' : '#E5E7EB', height: '1px' }}></div>
            <ProfileCard darkSide={darkSide} />
            <div className="px-4 flex flex-col md:flex-row-reverse md:items-start mt-0">
                <div className="w-full md:w-8/12 mx-0 h-64" style={{ marginTop: '0px' }}>
                    {/* About Section */}
                    <div className="bg-white p-3 shadow-sm rounded-sm dark:bg-gray-800 dark:text-white">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 dark:bg-slate-600 dark:text-white">
                            <div className="fel flex-col">
                                <div className="tracking-wide border-b-2 border-black font-bold">Saved News</div>
                                {/* Render articles */}
                                <div>
                                    <div className="container my-12 mx-auto px-4 md:px-12">
                                        <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                            {articles.map(article => (
                                                <div key={article.id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                                    <article className="overflow-hidden rounded-lg shadow-lg">
                                                        <a href="#">
                                                            <img alt="Placeholder" className="block h-48 w-full object-cover" src={article.urlToImage} />
                                                        </a>
                                                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                                            <h1 className="text-lg">
                                                                <a className="no-underline hover:underline text-black dark:text-white" href="#">
                                                                    {article.title}
                                                                </a>
                                                            </h1>
                                                            <p className="text-grey-darker text-sm">
                                                                {article.date}
                                                            </p>
                                                        </header>
                                                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                                            <a className="flex items-center no-underline hover:underline text-black" href="#">
                                                                <h3 className="dark:text-white">Author</h3>
                                                                <p className="ml-2 text-sm dark:text-white">
                                                                    {article.author}
                                                                </p>
                                                            </a>
                                                            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                                                <span className="hidden">Like</span>
                                                                <i className="fa fa-heart"></i>
                                                            </a>
                                                        </footer>
                                                    </article>
                                                </div>
                                            ))}
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
