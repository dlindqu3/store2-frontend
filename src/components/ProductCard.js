import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ productData, currentUserId, currentToken, cart, setCart }) {

  let baseURL = "http://127.0.0.1:8000"


  let checkProductInCart = async (cart, product) => {
    // check for CartItem with given cart_id and product_id
    console.log("current cart: ", cart)
    console.log("current product: ", product)
    let productId = product.id 
    let reqHeaders = {
      headers:{
        "Accept": "application/json"
    }
  }
    let getItemsInCartUrl = baseURL + "/api/cart_items/" + cart.id 
    const res = await axios.get(getItemsInCartUrl, reqHeaders)
    console.log("res.data for items in cart: ", res.data)
    
    for (let i = 0; i < res.data.length; i++){
      let currentObj = res.data[i]
      if (currentObj.product_id === productId){
        return currentObj; 
      }
    }
    return false; 
  }

  let handleAddNewToCart = async (productData, cart) => {
    let baseUrl = "http://127.0.0.1:8000"
    let addNewCartItemUrl = baseUrl + "/api/cart_items"
    let addNewCartItemBody = { 
        "cart_id": cart.id,
        "product_id": productData.id,
        "quantity": 1
      }
      let reqHeaders = {
        headers:{
          "Accept": "application/json"
      }
    }

    // add new cart item 
    let res = await axios.post(addNewCartItemUrl, addNewCartItemBody, reqHeaders)

    let newCartTotalPrice = productData.price + cart.total_cost

    let updateCartBody =   {
      "total_cost": newCartTotalPrice
    }

    let updateCartUrl = baseURL + "/api/carts/" + cart.id

    // update cart total_cost 
    let res2 = await axios.put(updateCartUrl, updateCartBody, reqHeaders)

    setCart(res2.data)
    return {"newCartItem": res.data, "updatedCart":res2.data}

  };

  let handleAddExistingToCart = async (cart, product) => {

    console.log("handleAddExistingToCart called")

    let baseUrl = "http://127.0.0.1:8000/api/cart_items/"
    let currentCartItemUrl = baseUrl + cart.id + "/" + product.id
    console.log("currentCartItemUrl: ", currentCartItemUrl)
    let reqHeaders = {
      headers:{
        "Accept": "application/json"
      }
    }
    let currentCartItem = await axios.get(currentCartItemUrl, reqHeaders)

    console.log("currentCartItem: ", currentCartItem)
    
    // update currentCartItem.data, quantity + 1 
    let updateCartItemUrl = "http://127.0.0.1:8000/api/cart_items/" + currentCartItem.data[0].id

    let updateCartItemBody = {
      quantity: currentCartItem.data[0].quantity + 1 
    }

    let updatedCartItem = await axios.put(updateCartItemUrl, updateCartItemBody, reqHeaders)
    console.log("updatedCartItem.data: ", updatedCartItem.data)

    // ADD to cart.total_price for adding existing to cart
    let updateCartUrl = "http://127.0.0.1:8000/api/carts/" + cart.id
    let updateCartBody = {
      "total_cost": cart.total_cost + product.price
    }
    let updatedCart = await axios.put(updateCartUrl, updateCartBody, reqHeaders)
    console.log("updated cart.data: ", updatedCart.data)
    setCart(updatedCart.data)
  };

  // works so far, can check if item is in cart add new item 
  let handleAddSubmit = async (cart, product) => {
    let res1 = await checkProductInCart(cart, product)
    // returns either "false" OR the cart_item object 
    console.log("res1 from handleAddSubmit: ", res1)

    if (!res1){
      let res2 = await handleAddNewToCart(product, cart)
      console.log("newly added cart item and updated cart: ", res2)
    } 
    
    else if (res1){

      console.log("product already in cart")
      // update quantity for existing cart object AND update cart's total_cost
      let res2 = await handleAddExistingToCart(cart, product)
      // console.log('res2 from handleAddExistingToCart: ', res2.data)

    }
  } 

  return (
    <div style={{ }}>
      <Card style={{ maxWidth: "50vh", marginBottom: "3vh", marginTop: "3vh", minHeight: "60vh" }}>
        <Card.Img variant="top" src={productData.image} />
        <Card.Body>
          <Card.Title>{productData.brand}: {productData.name}</Card.Title>
           <Card.Text>{productData.description}</Card.Text>
           <Button onClick={() => {handleAddSubmit(cart, productData)}} >ADD</Button>
        </Card.Body>
      </Card>      
    </div>
  );
}

export default ProductCard;