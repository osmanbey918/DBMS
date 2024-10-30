// import React from 'react'

// export default function User({ users }) {
//   return (
//     <div>
//       {users.map((user) => (
//         <div>
//           <h1>{user.name}{user.id}</h1>
//         </div>))}
//     </div>
//   )
// }



import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/userSlice';
import React from 'react';

export default function User() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div>
        <h1>{currentUser.name}</h1>
    </div>
  );
}
