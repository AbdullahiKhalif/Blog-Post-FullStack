import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../Features/AppSlice/authSlice';

const Header = () => {
  const {currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    navigate('/login')
  }
  return (
    <div className="fixed p-4 bg-white z-10 backdrop-blur shadow-lg top-0 left-0 right-0">
    <div className="max-w-6xl m-auto">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-orange-400">
          BLOGER
        </Link>

        {currentUser?.username ? (
          <ul className="flex justify-between items-center text-[16px] space-x-5">
            <Link>Posts</Link>
            <Link to='/create-post'>Create Post</Link>
          </ul>
        ) : (
          <ul className="flex justify-between items-center text-[16px] space-x-5">
            <Link to='/'>Posts</Link>
          </ul>
        )}

        {currentUser?.username ? <div className='flex justify-end items-center space-x-5 cursor-pointer' onClick={handleLogoutUser}>
          <button
            className="flex items-center justify-center bg-[#6EE7B7] h-10 w-10 rounded-full text-center text-greeb-800 font-semibold text-2xl"
          >
            {currentUser?.username[0].toUpperCase()}
          </button>
          <button className='bg-green-600 px-3 py-2 text-white rounded-md'>Logout</button>
        </div> : 
          <ul className="flex justify-between space-x-5 items-center">
            <Link to="/login">Sing In</Link>
            <Link
              to="/signup"
              className="bg-green-900 py-2 px-4 text-white rounded-md hover:bg-green-800"
            >
              Sign Up
            </Link>
          </ul>
        }
      </div>
    </div>
  </div>
  )
}

export default Header