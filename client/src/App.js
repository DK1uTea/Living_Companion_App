import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAndRegister from "./pages/LoginAndRegister";
import Sidebar from "./components/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import HabitPage from "./pages/HabitPage";
import ConsumptionPage from "./pages/ConsumptionPage";
import { jwtDecode } from "jwt-decode";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if(token && userData){
      setUser(JSON.parse(userData));
      setIsAuth(true);
    }
  }, []);

  return (
    <Router>
      {
        isAuth ? (
          <Container fluid>
            <Row>
              {/* Sidebar */}
              <Col xs={isCollapsed ? 1 : 3} md={isCollapsed ? 1 : 2} className="p-0" style={{
                border: "2px solid #333", 
                borderTopRightRadius: "20px", 
                borderBottomRightRadius: "20px", 
                padding: "10px",
                backgroundColor: "linear-gradient(to right, #1f4037, #99f2c8);"}}
              >
                <Sidebar user={user} setIsAuth={setIsAuth} setUser={setUser} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
              </Col>
              {/* Main Content */}
              <Col xs={isCollapsed ? 11 : 9} md={isCollapsed ? 11 : 10} className="p-0">
                <Routes>
                  {user && (
                    <>
                      <Route path='/home-page' element={<HomePage />}></Route>
                      <Route path='/todo-page' element={<TodoPage />}></Route>
                      <Route path='/habit-page' element={<HabitPage />}></Route>
                      <Route path='/consumption-page' element={<ConsumptionPage />}></Route>
                      <Route path='*' element={<Navigate to='/home-page' />} />
                    </>
                  )}
                </Routes>
              </Col>
            </Row>
          </Container>
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
