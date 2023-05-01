import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import NavbarComponent from "./components/NavbarComponent";
import Register from "./pages/Register"
import Home from "./pages/Home";
import { Nav } from "react-bootstrap";
import Login from "./pages/Login";


function App() {

  const [currentUsername, setCurrentUsername] = useState();
  // email is unique in db
  const [currentEmail, setCurrentUserEmail] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [cart, setCart] = useState();

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register setCart={setCart} setCurrentToken={setCurrentToken} setCurrentUsername={setCurrentUsername} setCurrentUserEmail={setCurrentUserEmail} setCurrentUserId={setCurrentUserId} />} />
            <Route path="/login" element={<Login setCart={setCart} setCurrentToken={setCurrentToken} setCurrentUsername={setCurrentUsername} setCurrentUserEmail={setCurrentUserEmail} setCurrentUserId={setCurrentUserId} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
