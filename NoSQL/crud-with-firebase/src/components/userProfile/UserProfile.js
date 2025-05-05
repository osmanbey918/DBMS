import React from 'react'
import { useSelector } from 'react-redux';

export default function UserProfile() {
    const currentUser = useSelector((state) => state.auth?.user);
    
    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <div className="profile-info">
                <img src={currentUser.photoURL || 'https://via.placeholder.com/80'} alt="Profile" className="profile-picture" />
                <div className="user-details">
                    <h2 className="username">{currentUser.name}</h2>
                    <p className="work">{currentUser.email}</p>
                </div>
            </div>
        </div>
    )
}
