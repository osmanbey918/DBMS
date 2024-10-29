import React from 'react'

export default function User({ users }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {/* <h1>{user.email}</h1> */}
          <h1>{user.name}</h1>
        </div>))}
    </div>
  )
}
