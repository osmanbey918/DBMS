import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/userSlice";

export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) return <div>Loading...</div>;
  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div><strong>Name:</strong> {currentUser.name}</div>
      <div><strong>Email:</strong> {currentUser.email}</div>
      <div><strong>Phone:</strong> {currentUser.phone}</div>
      <div><strong>Address:</strong> {currentUser.address}</div>
      <div><strong>Gender:</strong> {currentUser.gender}</div>
      {/* Add edit functionality as needed */}
    </div>
  );
}