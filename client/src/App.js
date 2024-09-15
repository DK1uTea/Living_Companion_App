import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAndRegister from "./pages/LoginAndRegister";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);



  return (
    <Router>
      {
        isAuth ? 
        (
          <div>
            <Sidebar user={user} setUser={setUser} setIsAuth={setIsAuth}/>
            <Routes>
              <Route path='/home' element={<Home />}/>
            </Routes>
            
          </div>
        ) : 
        (
          <Routes>
            <Route path='/login-and-register' element={<LoginAndRegister setIsAuth={setIsAuth} setUser={setUser} />} />
            <Route path='*' element={<Navigate to='/login-and-register'/>} />
          </Routes>
        )
      }
    </Router>
  );
}

export default App;
