import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './component/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Cart from './component/cart';
import React, { useState } from 'react'
import OrderConfirm from './component/orderConfirm';


function App() {
  const [addToCart,setAddToCart]=useState([]);
  
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Main addToCart={addToCart} setAddToCart={setAddToCart} />}/>
      <Route path='/cart' element={<Cart addToCart={addToCart} setAddToCart={setAddToCart}/>}/>
      <Route path='/orderconfirm' element={< OrderConfirm addToCart={addToCart} />}/>

    </Routes>
    </div>
  );
}

export default App;
