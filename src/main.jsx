import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Login from './components/Login.jsx'
import './index.css'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import Cart from './components/Cart.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Cart' element={<Cart/>}/>
    </Routes>
  </BrowserRouter>
)