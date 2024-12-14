import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Createpost from './pages/create-post/Createpost';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/createpost' element={<Createpost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
