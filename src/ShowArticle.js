import React, { useState, useEffect } from 'react';
import {Gimage} from './ArticleList';
import {Gtitle} from './ArticleList';
import {Gauthor} from './ArticleList';
import {Gcontent} from './ArticleList';
import {Gpublishtime} from './ArticleList';
import ProfileNavbar from './profileNavbar';
import useDarkSide from './useDarkSide';



const Article = () => {
  const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = checked => {
      setTheme(colorTheme);
      setDarkSide(checked);
  };

  return (
    <div style={{ backgroundColor: darkSide ? '#1F2937' : '#F3F4F6', minHeight: '200vh'}}>
            <ProfileNavbar darkSide={darkSide} toggleDarkMode={toggleDarkMode} />
            <div style={{ backgroundColor: darkSide ? '#374151' : '#E5E7EB', height: '1px' }}></div>
    <div className="max-w-[1296px] mx-auto flex flex-col gap-2 p-24">
      <div className="flex">
        <div className="flex-1">
          <img src={Gimage} alt="Article Image" />
          <h1 className="dark:text-white text-3xl font-bold mb-4 py-3">{Gtitle}</h1>
          <p className="text-sm dark:text-white text-gray-600 italic py-2">
            Analysis by {Gauthor} {Gpublishtime}
          </p>
          <div className='dark:text-white' id="content">
            {Gcontent.split('.').map((sentence, index) => (
              <p key={index} className="font-serif text-base pb-5">
                {sentence.trim()}.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Article;
