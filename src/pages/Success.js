import React, { useEffect } from 'react';
import axios from "axios";

function Success({ cart, setCart, currentToken, currentUserId, setItemsProductsData }) {

  let getNewCart = async () => {

    // get new cart 
    let baseURL = "https://store2-backend.herokuapp.com"
    let getCartUrl = baseURL + "/api/carts/" + currentUserId 

    let reqHeaders = {
      headers:{
        "Accept": "application/json",
        Authorization: `Bearer ${currentToken}`
      }
    }

    try {
      const res = await axios.get(getCartUrl, reqHeaders)

      if (res.data[0] !== cart){
        // set state 
        setCart(res.data[0])
        setItemsProductsData(null);
      }

    } catch (err) {
      if (err.response.data.message === "Unauthenticated."){
        localStorage.removeItem("store2-user")
      } else {
        console.log("error from Success.js useEffect: ", err)
      }
    } 

  }

  // runs on every render 
  useEffect(() => {
    console.log("Success.js useEffect called");
    // getNewCart();
    });

  return (
    <div>The cart checkout session succeeded.</div>
  )
}

export default Success