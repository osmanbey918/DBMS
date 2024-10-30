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




import React from 'react';

export default function User({ users }) {
  // Check if user exists before rendering
  if (!users) {
    return <h1>No active user</h1>;
  }

  return (
    <div>
      <h1>{users.name}</h1>
    </div>
  );
}
