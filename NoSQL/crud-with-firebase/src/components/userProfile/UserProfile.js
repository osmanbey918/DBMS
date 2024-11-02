import React from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/userSlice';
import User from '../feed/User';

export default function UserProfile() {
    const currentUser = useSelector(selectCurrentUser);
    return (
        <div className="user-profile">
            <div className="profile-info">
                <img alt="Profile" className="profile-picture" />
                <div className="user-details">
                    <h2 className="username"><User /></h2>
                    <p className="work">{currentUser.email}</p>
                </div>
            </div>
        </div>
    )
}
