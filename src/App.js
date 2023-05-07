import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import AllProducts from "./pages/AllProducts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import axios from "axios"
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function App() {
  const [currentUsername, setCurrentUsername] = useState();
  const [currentEmail, setCurrentUserEmail] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [cart, setCart] = useState();


  let checkUserData = async () => {
    let userData = localStorage.getItem("store2-user");
    if (userData){
      // console.log("userData from app.js: ", userData);

      let userObj = JSON.parse(userData)
      console.log("userObj from local storage: ", userObj)
  
      let userId = userObj["store2UserId"]
  
      let baseURL = "http://127.0.0.1:8000"
      let getCartUrl = baseURL + "/api/carts/" + userId 

      let reqHeaders = {
        headers:{
          "Accept": "application/json",
          Authorization: `Bearer ${userObj["store2Token"]}`
        }
      }
  
      try {
        const res = await axios.get(getCartUrl, reqHeaders)
        // console.log("cart data from app.js useEffect: ", res)

        // set states 
        setCurrentUsername(userObj["store2Username"])
        setCurrentUserEmail(userObj["store2UserEmail"])
        setCurrentUserId(userObj["store2UserId"])
        setCurrentToken(userObj["store2Token"])
        setCart(res.data[0])
        // console.log("cart data in state from app.js useEffect: ", res.data[0])

        } catch (err) {
        if (err.response.data.message === "Unauthenticated."){
          console.log("the user data in local storage has expired")
          localStorage.removeItem("store2-user")
        } else {
          console.log("error from App.js useEffect: ", err)
        }
        } 
    } else {
      console.log("there is no user data in local storage")
    }
  };

  // runs only on first render 
  useEffect(() => {
    // console.log("App.js useEffect called");
    checkUserData();
  }, []);

  return (
    <div className="App">
      {console.log("cart from app.js return: ", cart)}
      <BrowserRouter>
        <NavbarComponent
          currentUsername={currentUsername}
          setCurrentUsername={setCurrentUsername}
          setCurrentUserEmail={setCurrentUserEmail}
          setCurrentUserId={setCurrentUserId}
          setCurrentToken={setCurrentToken}
          setCart={setCart}
        />
        <div>
          {console.log("page loaded")}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={ <Register /> } />
            <Route
              path="/login"
              element={
                <Login                 
                setCart={setCart}
                setCurrentToken={setCurrentToken}
                setCurrentUserEmail={setCurrentUserEmail}
                setCurrentUsername={setCurrentUsername}
                setCurrentUserId={setCurrentUserId}
              /> 
              }
            />

            <Route 
              path="/all-products"
              element={currentUsername ? 
                <AllProducts                   
                  cart={cart}
                  setCart={setCart}
                  currentUsername={currentUsername}
                  currentToken={currentToken}
                  currentEmail={currentEmail}
                  currentUserId={currentUserId}
                /> 
                : <Login />
              }
            /> 

            <Route 
              path="/cart"
              element={currentUsername ? 
                <Cart                  
                  cart={cart}
                  setCart={setCart}
                  currentToken={currentToken}
                  currentEmail={currentEmail}
                  currentUserId={currentUserId}
                /> 
                : <Login />
              }
            /> 
            {/* <Route path="/cart" element={<Cart cart={cart} setCart={setCart} currentUsername={currentUsername} currentToken={currentToken} currentEmail={currentEmail}  currentUserId={currentUserId} />} /> */}
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
