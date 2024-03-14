// App.js

import React from 'react';
import MyComponent from './navbar';
import Login from './Login'; 
import Register from './Register';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<MyComponent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
