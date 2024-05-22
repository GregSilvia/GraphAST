import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/home.jsx';
import About from './Components/About.jsx';
import NotFound from './Components/NotFound.jsx';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default App;
