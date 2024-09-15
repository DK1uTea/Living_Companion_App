import React from 'react'
import './Sidebar.css';
import { Button } from 'react-bootstrap';
export default function Sidebar({ user, setUser, setIsAuth }) {
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false);
    setUser(null);
    console.log('Logout successful!');
  };
  
  return (
    <div>
      <h1>Hello {user.username}</h1>
      <Button 
        variant='danger'
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  )
}
