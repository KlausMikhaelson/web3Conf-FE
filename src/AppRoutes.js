import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Home';
import Main from './component/Main';
import Navbar from './component/Navbar';
import Createteam from './component/CreateTeam';
const AppRoutes = () => {
  return (
    <Router>
       <Navbar/>
        <Routes>    
          <Route path='/' element={<Main/>}></Route>
            <Route path='group/board/:id' element={<Home />} />
            <Route path='/group' element={<Createteam />} />
        </Routes>
    </Router>
  )
}

export default AppRoutes