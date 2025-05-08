import { useSelector } from 'react-redux';
import React from 'react';

export default function User() {
  const currentUser = useSelector((state) => state.auth?.user);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
        <h1>{currentUser.name}</h1>
    </div>
  );
}
