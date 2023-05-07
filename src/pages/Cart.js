import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import CartItem from "../components/CartItem";

function Cart({ cart, setCart, currentToken, currentEmail, currentUserId }) {

    const [errorText, setErrorText] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [emptyCartText, setEmptyCartText] = useState(true);
    const [productsCartItems, setProductsCartItems] = useState(); 
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

    return (
        <div>
            <div>Cart Page</div>
            { emptyCartText && <p>Your cart is empty.</p> }
            { isLoading ? <p>Loading...</p>: <p></p>}
            {/* { console.log("cart from Cart.js: ", cart)} */}
            {/* { itemsProductsData && <p>{JSON.stringify(itemsProductsData)}</p>} */}
            { itemsProductsData && Object.keys(itemsProductsData).map((key) => {
              return <div>
                      { <CartItem itemProductObj={itemsProductsData[key]} /> }
                      <br />
                    </div>
            })}
            { cart && JSON.stringify(cart) }
        </div>
    )
}

export default Cart