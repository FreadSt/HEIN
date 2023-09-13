import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import ShoppingCategories from './pages/ShoppingCategorie';
import SingleProduct from './pages/SingleProduct';
import ShoppingCart from './pages/ShoppingCart';
import Orders from './pages/Orders';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {AdminPanel} from "./pages/AdminPanel.jsx";
import {publicRequest} from "./request-methods.js";

const App = () => {
  const user = useSelector((store) => store.auth.currentUser);
    return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/categories/:category' element={<ShoppingCategories/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/categories/:category' element={<ShoppingCategories/>}/>
        <Route path='/products/:id' elment={<SingleProduct/>}/>
        <Route path='/cart' element={<ShoppingCart/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path={'/adminpanel'} element={<AdminPanel/>}/>
      </Routes>
        {/*<Route path='/categories/:category'>*/}
        {/*  <ShoppingCategories />*/}
        {/*</Route>*/}
        {/*<Route path='/products/:id'>*/}
        {/*  <SingleProduct />*/}
        {/*</Route>*/}
        {/*<Route path='/cart'>*/}
        {/*  <ShoppingCart />*/}
        {/*</Route>*/}
        {/*<Route path='/orders'>*/}
        {/*  <Orders />*/}
        {/*</Route>*/}
        {/*<Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>*/}
        {/*<Route path='/signup'>*/}
        {/*  <Signup />*/}
        {/*</Route>*/}
        {/*<Route path={'/adminpanel'}>*/}
        {/*  <AdminPanel/>*/}
        {/*</Route>*/}
    </Router>
  );
};

export default App;
