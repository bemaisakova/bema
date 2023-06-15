import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage';
import PostsPage from './pages/PostsPage';



const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/bem___' element={<HomePage/>}/>
      <Route path='/slooxnwe0r824ns02lsndks' element={<PostsPage/>} />
    </Routes>
  );
};

export default MainRoutes;