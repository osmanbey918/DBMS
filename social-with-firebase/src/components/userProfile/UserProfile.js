import { React, useState } from 'react'
import { useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import Modal from '../common/Modal';
import FeedForm from '../feed/FeedForm';


export default function UserProfile() {
    const [isBoxVisible, setIsBoxVisible] = useState(false);

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const currentUser = useSelector((state) => state.auth?.user);

    if (!currentUser) {
        return <div>Loading...</div>;
    }
    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible);
    };


    return (
        <div className="user-profile">
            <div className="profile-info">
                <img src={currentUser.photoURL || 'https://via.placeholder.com/80'} alt="Profile" className="profile-picture" />
                <div className="user-details">
                    <h2 className="username">{currentUser.name}</h2>
                    <div className="user-contact">
                        <p className="user-email">{currentUser.email}</p>
                        <p className="user-address">{currentUser.address}</p>

                        <button onClick={toggleBox} className="create-btn">
                            Create Post
                        </button>
                        <Modal isOpen={isBoxVisible} onClose={toggleBox}>
                            <FeedForm onClose={toggleBox} />
                        </Modal>

                        <button onClick={handleLogout} className='btn-log'>Logout</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
