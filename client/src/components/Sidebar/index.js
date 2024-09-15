import React, { useState } from 'react'
import './Sidebar.css';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeartPulse, faHouse, faListCheck, faMoneyBillTransfer, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ user, setUser, setIsAuth, isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false);
    setUser(null);
    navigate('/login-and-register'); // Redirect to login after logout
    console.log('Logout successful!');
  };

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <Nav className={`flex-column vh-100 p-3 ${isCollapsed ? 'collapsed' : ''}`}>
      <div className='sidebar-header'>
        <p className='sidebar-appname'>Living Companion App</p>
        <FontAwesomeIcon icon={faBars} onClick={handleToggleSidebar} />
      </div>
      <div className='sidebar-main'>
        <h1 style={{ fontSize: '24px' }}>Hello {user.username}</h1>
        <Nav.Link onClick={() => navigate('/home-page')}>
          <FontAwesomeIcon icon={faHouse} style={{ color: 'black', marginRight: '10px' }} />
          <p>Home</p>
        </Nav.Link>
        <Nav.Link>
          <FontAwesomeIcon icon={faUser} style={{ color: 'black', marginRight: '10px' }} />
          <p>User</p>
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/todo-page')}>
          <FontAwesomeIcon icon={faListCheck} style={{ color: 'black', marginRight: '10px' }} />
          <p>Todo App</p>
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/habit-page')}>
          <FontAwesomeIcon icon={faHeartPulse} style={{ color: 'black', marginRight: '10px' }} />
          <p>Habits Tracker</p>
        </Nav.Link>
        <Nav.Link onClick={() => navigate('/consumption-page')}>
          <FontAwesomeIcon icon={faMoneyBillTransfer} style={{ color: 'black', marginRight: '10px' }} />
          <p>Consumption Tracker</p>
        </Nav.Link>
      </div>
      <div className='sidebar-footer'>
        <Button variant='danger' onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} style={{ rotate: '180deg' }} />
          <p>Logout</p>
        </Button>
      </div>
    </Nav>
  );
}
