import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import LoginAndRegister from "./pages/LoginAndRegister";
import Sidebar from "./components/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import HabitPage from "./pages/HabitPage";
import ConsumptionPage from "./pages/ConsumptionPage";
import './App.css';
import StatisticPage from "./pages/StatisticPage";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuth(true);
    }
  }, []);

  return (
    <Router>
      {
        isAuth ? (
          <div>
            <div className="top-bar">
              <div className="icon-open-menu">
                <FontAwesomeIcon icon={faBars} onClick={() => {setIsCollapsed(!isCollapsed)}}/>
              </div>
              <div className="app-name-title mx-auto">
                <strong>Living Companion App</strong>
              </div>
            </div>
            <Sidebar
              user={user}
              setIsAuth={setIsAuth}
              setUser={setUser}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <Routes>
              {user && (
                <>
                  <Route path='/home-page' element={<HomePage />}></Route>
                  <Route path='/statistic-page' element={<StatisticPage />}></Route>
                  <Route path='/todo-page' element={<TodoPage />}></Route>
                  <Route path='/habit-page' element={<HabitPage />}></Route>
                  <Route path='/consumption-page' element={<ConsumptionPage />}></Route>
                  <Route path='*' element={<Navigate to='/home-page' />} />
                </>
              )}
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path='/login-and-register' element={<LoginAndRegister setIsAuth={setIsAuth} setUser={setUser} />} />
            <Route path='*' element={<Navigate to='/login-and-register' />} />
          </Routes>
        )
      }
    </Router>
  );
}

export default App;
