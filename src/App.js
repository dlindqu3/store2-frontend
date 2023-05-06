import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import AllProducts from "./pages/AllProducts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import axios from "axios"

function App() {
  const [currentUsername, setCurrentUsername] = useState();
  const [currentEmail, setCurrentUserEmail] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [cart, setCart] = useState();
  const [cartItems, setCartItems] = useState();


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
        console.log("cart data from app.js useEffect: ", res)

        let cartId = res.data[0].id
        let getCartItemsUrl = baseURL + "/api/cart_items/" + cartId

        const res2 = await axios.get(getCartItemsUrl, reqHeaders)
        console.log("cart items data from app.js useEffect: ", res2)

        // set states 
        setCurrentUsername(userObj["store2Username"])
        setCurrentUserEmail(userObj["store2UserEmail"])
        setCurrentUserId(userObj["store2UserId"])
        setCurrentToken(userObj["store2Token"])
        setCart(res.data[0])
        setCartItems(res2.data)

        } catch (err) {
        if (err.response.data.message === "Unauthenticated."){
          console.log("the user data in local storage has expired")
          localStorage.removeItem("store2-user")
        }
        } 
    } else {
      console.log("there is no user data in local storage")
    }
  };

  // runs only on first render 
  useEffect(() => {
    console.log("App.js useEffect called");
    checkUserData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent
          currentUsername={currentUsername}
          setCurrentUsername={setCurrentUsername}
          setCurrentUserEmail={setCurrentUserEmail}
          setCurrentUserId={setCurrentUserId}
          setCurrentToken={setCurrentToken}
          setCart={setCart}
          setCartItems={setCartItems}
        />
        <div>
          {console.log("page loaded")}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                <Register
                  setCart={setCart}
                  setCurrentToken={setCurrentToken}
                  setCurrentUsername={setCurrentUsername}
                  setCurrentUserEmail={setCurrentUserEmail}
                  setCurrentUserId={setCurrentUserId}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setCartItems={setCartItems}
                  setCart={setCart}
                  setCurrentToken={setCurrentToken}
                  setCurrentUsername={setCurrentUsername}
                  setCurrentUserEmail={setCurrentUserEmail}
                  setCurrentUserId={setCurrentUserId}
                />
              }
            />

            <Route 
              path="/all-products"
              element={currentUsername ? 
                <AllProducts                   
                  setCart={setCart}
                  currentUsername={currentUsername}
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
