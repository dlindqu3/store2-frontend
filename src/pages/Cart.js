import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Cart(cart, setCart, currentUsername, currentToken, currentEmail, currentUserId) {

    // const [cart, setCart] = useState();
    // const [totalCost, setTotalCost] = useState(0);
    // const [errorText, setErrorText] = useState()
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // let getCartItems = async () => {
        //     let baseURL = "http://127.0.0.1:8000"
        //     let getCartItemsUrl = baseURL + "/api/cart_items/" + cart.id
        //     let reqHeaders = {
        //         headers:{
        //           "Accept": "application/json"
        //       }
        //     }
        // }
        console.log("cart passed into Cart.js: ", cart)
        console.log("currentUserId passed into Cart.js: ", currentUserId)
        console.log("currentUsername passed into Cart.js: ", currentUsername)

      }, []);

    return (
        <div>Cart Page</div>
    )
}

export default Cart