import React from 'react'

import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import Feed from '../../components/feed/Feed';

export default function Home() {
  const dispatch = useDispatch()
  const handleLogout = ()=>{
dispatch(logout())
  }
  return (
    <div>
        <h1>List of posts</h1> 
        <button onClick={handleLogout}>logout</button>
         <Feed/> 
    </div>
  )
}