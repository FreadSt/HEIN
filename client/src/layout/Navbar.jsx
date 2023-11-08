import React from 'react';

import {Badge} from '@mui/material';
import {Search, ShoppingCart} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import {logout} from "../store/auth-slice.js";

const Navbar = () => {
  const [user, setUser] = useState(useSelector((store) => store.auth.currentUser));
  const cartStore = useSelector((store) => store.cart)
  const totalQuantity = cartStore[user?.username ?? null]?.totalQuantity ?? 0
  const dispatch = useDispatch()

  return (
    <nav className='grid grid-cols-2 p-4 border-b font-semibold h-18'>
      <h1 className='font-bold text-3xl uppercase flex items-center justify-start px-4 tracking-wider'>
        <a href='/'>Hein.</a>
      </h1>
      <div className='flex justify-end items-center px-4 text-md md:text-lg'>
        {
          user ?
            <>
              <Link className='px-4 py-2'>{user.username}</Link>
              <button className='px-4 py-2' onClick={() => {
                dispatch(logout())
                setUser(undefined)
                window.location.href = "/"
              }}>Sign Out
              </button>
            </>
            :
            <>
              <Link to='/signup' className='uppercase px-4 py-2'>
                Register
              </Link>
              <Link to='/login' className='uppercase px-4 py-2'>
                Sign in
              </Link>
            </>
        }
        <Link to='/cart'>
          <Badge
            badgeContent={totalQuantity}
            color='primary'
            className='cursor-pointer'
          >
            <ShoppingCart/>
          </Badge>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
