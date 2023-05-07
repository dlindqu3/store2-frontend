import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import CartItem from "../components/CartItem";
import axios from "axios";

function Cart({ cart, setCart, currentToken, currentEmail, currentUserId }) {

    const [errorText, setErrorText] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [emptyCartText, setEmptyCartText] = useState(true);
    const [itemsProductsData, setItemsProductsData] = useState(); 

    let baseURL = "http://127.0.0.1:8000"

    let reqHeaders = {
      headers:{
        "Accept": "application/json",
        Authorization: `Bearer ${currentToken}`
      }
    }

    let getCartItemsAndFilteredProducts = async () => {

      let getCartItemsUrl = baseURL + "/api/cart_items/" + cart.id
      console.log("cartItemsUrl: ", getCartItemsUrl)
      let cartItems = await axios.get(getCartItemsUrl, reqHeaders)
      console.log("cart items from cart page: ", cartItems.data)

      if (cartItems.data.length < 1){
        setIsLoading(false); 
        return;
      } else { 
        setEmptyCartText(false); 
      }

      let filteredProductIds = []
      for (let i = 0; i < cartItems.data.length; i++){
        let currentCartItem = cartItems.data[i]
        filteredProductIds.push(currentCartItem.product_id)
      }

      let filteredProductsUrl = baseURL + "/api/products/filter"
      let reqBody = { "productIds": filteredProductIds }
      let filteredProducts = await axios.post(filteredProductsUrl, reqBody, reqHeaders)
      console.log("filtered products cart page: ", filteredProducts.data)
      
      let resObj = {}

      for (let i = 0; i < filteredProductIds.length; i++){
        resObj[filteredProductIds[i]] = {}
      }

      // console.log("cartItems.data: ", cartItems.data)
      for (let j = 0; j < cartItems.data.length; j++){
        let currentCartItem = cartItems.data[j]
        let currentProductId = currentCartItem["product_id"]
        resObj[currentProductId]["cart_item"] = cartItems.data[j] 
      }

      for (let k = 0; k < filteredProducts.data.length; k++){
        let currentProductId = filteredProducts.data[k].id
        resObj[currentProductId]["product_item"] = filteredProducts.data[k]
      }

      console.log("resObj from cart useEffect: ", resObj)
      setItemsProductsData(resObj)
    }

    useEffect(() => {
      getCartItemsAndFilteredProducts()
      setIsLoading(false)
    }, []);

    let handleDeleteCart = async (cart) => {

      console.log("cart from handleDeleteCart: ", cart)
      let deleteCartUrl = baseURL + "/api/carts/" + cart.id

      let res = await axios.delete(deleteCartUrl, reqHeaders)
      console.log("res from delete cart: ", res)
      // res.data = 1 means that 1 item was deleted successfully 

      if (res.data === 1){
        let createCartUrl = baseURL + "/api/carts"
        let createCartBody = { "user_id": currentUserId }
        let newCart = await axios.post(createCartUrl, createCartBody, reqHeaders)
        console.log("newCart.data: ", newCart.data)

        let getNewCartUrl = baseURL + "/api/carts/" + newCart.data.id
        let fullNewCart = await axios.get(getNewCartUrl, reqHeaders)
        console.log("fullNewCart.data: ", fullNewCart.data)

        setCart(fullNewCart.data[0])
        setItemsProductsData(null)
      }
    }

    return (
        <div>
            <div>Cart Page</div>
            { emptyCartText && <p>Your cart is empty.</p> }
            { isLoading ? <p>Loading...</p>: <p></p>}
            {/* { console.log("cart from Cart.js: ", cart)} */}
            {/* { itemsProductsData && <p>{JSON.stringify(itemsProductsData)}</p>} */}
            { itemsProductsData && Object.keys(itemsProductsData).map((keyData) => {
              return <div key={keyData}>
                      { <CartItem itemProductObj={itemsProductsData[keyData]} /> }
                      <br />
                    </div>
            })}
            { cart && <div><p>Delete cart: </p><Button onClick={() => {handleDeleteCart(cart)}}>DELETE Cart</Button> </div>}
            { cart && JSON.stringify(cart) }
        </div>
    )
}

export default Cart