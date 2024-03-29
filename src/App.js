// App.js

import React from 'react';
import MyComponent from './navbar';
import Login from './Login'; 
import Register from './Register';
import './index.css';
import Article from './ShowArticle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
export const ipAddress = 'https://webproject-react-server-1.onrender.com'; // Exporting ipAddress


const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<MyComponent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path='/Article' element={<Article/>}/>
      </Routes>
    </Router>
  );
};

export default App;
