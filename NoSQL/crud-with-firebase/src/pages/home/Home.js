import React from 'react'

import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import Feed from '../../components/feed/Feed';

export default function Home() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="header-container">
      <h1 className='feedstxt'>Feeds</h1>
      <button onClick={handleLogout} className='btn-log'>Logout</button>
      <Feed />
    </div>
  );

}