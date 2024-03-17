import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ipAddress } from './App';

const ArticleList = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setArticles([]);
        const defaultCategory = category || 'sport';
        const response = await axios.get(`http://${ipAddress}:3000/api/search?query=${defaultCategory}`);

        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = async (articleIndex) => {
    const article = articles[articleIndex];
    const isCurrentlyFavorite = favorites[articleIndex];
  
    // Conditionally send request based on the favorite status
    if (isCurrentlyFavorite) {
      try {
        const response = await axios.post(`http://${ipAddress}:3000/api/remove-article`, {
          username: "username", // Provide the username if required by the server
          title: article.title,
        });
  
        if (response.status === 200) {
          // Update the UI to reflect the successful removal
          const newFavorites = { ...favorites };
          newFavorites[articleIndex] = false;
          setFavorites(newFavorites);
        } else {
          throw new Error('Failed to remove favorite');
        }
      } catch (error) {
        alert('Error removing favorite');
        console.error('Error removing favorite:', error);
      }
    } else {
      try {
        const response = await axios.post(`http://${ipAddress}:3000/api/add-article`, {
          username: "username", // Provide the username if required by the server
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          isFavorite: true,
        });
  
        if (response.status === 200) {
          // Optionally, update the UI to reflect the successful save
          const newFavorites = { ...favorites };
          newFavorites[articleIndex] = true;
          setFavorites(newFavorites);
        } else {
          throw new Error('Failed to save favorite');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message === 'Article with the same title already exists.') {
          // Update the UI to reflect that the article already exists
          const newFavorites = { ...favorites };
          newFavorites[articleIndex] = true;
          setFavorites(newFavorites);
          alert('Article already exists.');
        } else {
          // Handle other errors
          alert('Error saving favorite');
          console.error('Error saving favorite:', error);
        }
      }
    }
  };
  
  
  
  

  return (
    <div className={`dark:bg-gray-700 ${loading ? 'dark:text-white' : 'dark:text-black'}`}>
      {loading && <p>Loading...</p>}
      {!loading && articles.length === 0 && <p>No articles available</p>}
      {!loading &&
        articles.length > 0 &&
        articles.map((article, index) => (
          <div key={index} className="hover:scale-90  dark:bg-gray-700 flex flex-wrap transform shadow-lg transition-transform duration-300 ease-in-out text-black dark:text-white  mb-16 p-6">
            <div className="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
              <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                <img src={article.urlToImage} className="lg:w-full" alt="Article" />
              </div>
            </div>

            <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
              <h5 className="mb-3 dark:text-white text text-lg font-bold cursor-pointer">{article.title}</h5>
              <div className="mb-3 flex items-center justify-center text-sm font-medium  dark:text-white md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
                  <path stroke="currentColor" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>
                News
              </div>
              <p className="mb-6 dark:text-white">
                <small>Published <u>{article.publishedAt}</u></small>
              </p>
              <p className=" dark:text-white">
                {article.description}
              </p>
              <a href="#!" className="star-link" onClick={() => toggleFavorite(index)}>
                <span style={{ display: 'inline-block' }}>
                  {favorites[index] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  )}
                </span>
              </a>

            </div>
          </div>
        ))}
    </div>
  );
};

export default ArticleList;
