import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FrontScreen from './components/FrontScreen';
import SecondPage from './components/SecondPage';
import { HashRouter, Route, Routes, Link } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <HashRouter><FrontScreen /></HashRouter>
    
)

const second = ReactDOM.createRoot(document.getElementById('bob'));
second.render(
  <React.StrictMode>
  <SecondPage />
  </React.StrictMode>
)



// const bob = ReactDOM.createRoot(document.getElementById('bob'));
// root.render(
//   <React.StrictMode>
//     <SecondPage />
//   </React.StrictMode>
// )
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <FrontScreen /> 
    
//   </React.StrictMode>
  
// );
// const second = ReactDOM.createRoot(document.getElementById('second'));
// second.render(
//   <React.StrictMode>
//     <SecondPage />
//   </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
