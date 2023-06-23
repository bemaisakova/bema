import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage';



const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
  );
};

export default MainRoutes;