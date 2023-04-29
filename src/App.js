import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import NavbarComponent from "./components/NavbarComponent";
import Register from "./pages/Register"
import Home from "./pages/Home";
import { Nav } from "react-bootstrap";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
