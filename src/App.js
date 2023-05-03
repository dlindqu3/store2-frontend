import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import AllProducts from "./pages/AllProducts";
import Register from "./pages/Register"
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {

  const [currentUsername, setCurrentUsername] = useState();
  // email is unique in db
  const [currentEmail, setCurrentUserEmail] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [cart, setCart] = useState();
  const [cartItems, setCartItems] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register setCart={setCart} setCurrentToken={setCurrentToken} setCurrentUsername={setCurrentUsername} setCurrentUserEmail={setCurrentUserEmail} setCurrentUserId={setCurrentUserId} />} />
            <Route path="/login" element={<Login setCartItems={setCartItems} setCart={setCart} setCurrentToken={setCurrentToken} setCurrentUsername={setCurrentUsername} setCurrentUserEmail={setCurrentUserEmail} setCurrentUserId={setCurrentUserId} />} />
            <Route path="/all-products" element={<AllProducts cart={cart} setCart={setCart} currentUsername={currentUsername} currentToken={currentToken} currentEmail={currentEmail}  currentUserId={currentUserId} />} />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
