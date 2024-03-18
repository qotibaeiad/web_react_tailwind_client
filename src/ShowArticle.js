import React from 'react';
import {Gimage} from './ArticleList';
import {Gtitle} from './ArticleList';
import {Gauthor} from './ArticleList';
import {Gcontent} from './ArticleList';
import {Gpublishtime} from './ArticleList';

const Article = () => {
  return (
    <div className="max-w-[1296px] mx-auto flex flex-col gap-2 p-24">
      <div className="flex">
        <div className="flex-1">
          <img src={Gimage} alt="Article Image" />
          <h1 className="text-3xl font-bold mb-4 py-3">{Gtitle}</h1>
          <p className="text-sm dark:text-white text-gray-600 italic py-2">
            Analysis by {Gauthor} {Gpublishtime}
          </p>
          <div id="content">
            {Gcontent.split('.').map((sentence, index) => (
              <p key={index} className="font-serif text-base pb-5">
                {sentence.trim()}.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
