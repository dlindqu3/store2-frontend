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
      if (currentObj.id == productId){
        return true; 
      }
    }
    return false; 
  }

  let handleAddNewToCart = async (productData, cart) => {
    let baseUrl = "http://127.0.0.1:8000"
    let addNewToCartUrl = baseUrl + "/api/cart_items"
    let addToCartBody = { 
        "cart_id": cart.id,
        "product_id": productData.id,
        "quantity": 1
      }
      let reqHeaders = {
        headers:{
          "Accept": "application/json"
      }
    }
    let res = await axios.post(addNewToCartUrl, addToCartBody, reqHeaders)

    console.log("cart total cost start: ", cart.total_cost)
    let newCartTotalPrice = productData.price + cart.total_cost

    console.log("new cart total price: ", newCartTotalPrice)

    let updateCartBody =   {
      "total_cost": newCartTotalPrice
    }

    let updateCartUrl = baseURL + "/api/carts/" + cart.id

    let res2 = await axios.put(updateCartUrl, updateCartBody, reqHeaders)

    setCart(res2.data)
    return [res.data, res2.data]

  };

  let handleAddExistingToCart = async (productData, cart_item_id, cart_id) => {
    
  };

  let updateCartTotalCost = async (cartId, cartItemsArray) => {
    
  };

  // works so far, can check if item is in cart add new item 
  let handleAddSubmit = async (cart, product) => {
    let res1 = await checkProductInCart(cart, product)
    console.log("res1 from handleAddSubmit: ", res1)

    if (res1 === false){
      let res2 = await handleAddNewToCart(product, cart)
      console.log("newly added cart item and updated cart: ", res2)
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