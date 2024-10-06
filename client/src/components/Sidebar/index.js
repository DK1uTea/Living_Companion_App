import React, { useState } from 'react'
import './Sidebar.css';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartLine, faHeartPulse, faHouse, faListCheck, faMoneyBillTransfer, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ user, setUser, setIsAuth, isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false);
    setUser(null);
    setIsCollapsed(true);
    navigate('/login-and-register'); // Redirect to login after logout
    console.log('Logout successful!');
  };

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to navigate and collapse sidebar
  const handleNavClick = (path) => {
    navigate(path);       // Navigate to the selected page
    setIsCollapsed(true);  // Collapse the sidebar after navigation
  };

  return (
    <Nav className={`flex-column justify-content-between p-3 ${isCollapsed ? 'collapsed' : 'expanded'} side-bar`}>
      <div>
        <div className='sidebar-header'>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <p className='sidebar-appname'>Living Companion App</p>
            <FontAwesomeIcon icon={faBars} onClick={handleToggleSidebar} />
          </div>
        </div>
        <div className='sidebar-main'>
          <h1>Hello {user.username}</h1>
          <Nav.Link onClick={() => handleNavClick('/home-page')}>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <FontAwesomeIcon icon={faHouse} bounce />
              <p>Home</p>
            </div>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/statistic-page')}>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <FontAwesomeIcon icon={faChartLine} bounce />
              <p>Statistic</p>
            </div>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/todo-page')}>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <FontAwesomeIcon icon={faListCheck} bounce />
              <p>Todo Tracking</p>
            </div>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/habit-page')}>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <FontAwesomeIcon icon={faHeartPulse} bounce />
              <p>Habit Tracking</p>
            </div>
          </Nav.Link>
          <Nav.Link onClick={() => handleNavClick('/consumption-page')}>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <FontAwesomeIcon icon={faMoneyBillTransfer} bounce />
              <p>Consumption Tracking</p>
            </div>
          </Nav.Link>
        </div>
      </div>
      <div className='sidebar-footer'>
        <Button variant='danger' onClick={handleLogout}>
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <FontAwesomeIcon icon={faRightFromBracket} style={{ rotate: '180deg' }} />
            <p>Logout</p>
          </div>
        </Button>
      </div>
    </Nav>
  );
}
