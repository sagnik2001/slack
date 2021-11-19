import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "semantic-ui-css/semantic.min.css"
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<App/>}/>
      </Routes>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

