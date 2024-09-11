import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Topbar from "./components/Topbar";
import LoginAndRegister from "./pages/LoginAndRegister";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path='/user/login-and-register' element={<LoginAndRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
