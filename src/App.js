// App.js

import React from 'react';
import MyComponent from './navbar'; // Import your existing component
import ArticleList from './ArticleList'; // Import the new ArticleList component

const App = () => {
  return (
    <div className='bg-gray-700'>
      <MyComponent />
    </div>
  );
};

export default App;
