import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ currentToken, productData, cart, setCart }) {

  let baseURL = "https://store2-backend.herokuapp.com"

  let reqHeaders = {
    headers:{
      "Accept": "application/json",
      Authorization: `Bearer ${currentToken}`
    }
  }


  let checkProductInCart = async (cart, product) => {
    // check for CartItem with given cart_id and product_id
    // console.log("current cart: ", cart)
    // console.log("current product: ", product)
    let productId = product.id 

    let getItemsInCartUrl = baseURL + "/api/cart_items/" + cart.id 
    const res = await axios.get(getItemsInCartUrl, reqHeaders)
    // console.log("res.data for items in cart: ", res.data)
    
    for (let i = 0; i < res.data.length; i++){
      let currentObj = res.data[i]
      if (currentObj.product_id === productId){
        return currentObj; 
      }
    }
    return false; 
  }
  
  let handleAddNewToCart = async (productData, cart) => {
    let baseUrl = "https://store2-backend.herokuapp.com"
    let addNewCartItemUrl = baseUrl + "/api/cart_items"
    let addNewCartItemBody = { 
        "cart_id": cart.id,
        "product_id": productData.id,
        "quantity": 1
      }

    // Add new cart item 
    let res = await axios.post(addNewCartItemUrl, addNewCartItemBody, reqHeaders)
    // console.log("added new cart item: ", res)

    let newCartTotalPrice = productData.price + cart.total_cost

    let updateCartBody =   {
      "total_cost": newCartTotalPrice
    }

    let updateCartUrl = baseURL + "/api/carts/" + cart.id

    // Update cart total_cost 
    let res2 = await axios.put(updateCartUrl, updateCartBody, reqHeaders)
    // console.log("updated cart after adding new cartItem: ", res2)

    setCart(res2.data)
    return {"newCartItem": res.data, "updatedCart":res2.data}

  };

  let handleAddExistingToCart = async (cart, product) => {

    // console.log("handleAddExistingToCart called")

    let baseUrl = "https://store2-backend.herokuapp.com/api/cart_items/"
    let currentCartItemUrl = baseUrl + cart.id + "/" + product.id
    // console.log("currentCartItemUrl: ", currentCartItemUrl)

    let currentCartItem = await axios.get(currentCartItemUrl, reqHeaders)
    // console.log("currentCartItem: ", currentCartItem)
    
    // Update currentCartItem.data: quantity + 1 
    let updateCartItemUrl = "https://store2-backend.herokuapp.com/api/cart_items/" + currentCartItem.data[0].id

    let updateCartItemBody = {
      quantity: currentCartItem.data[0].quantity + 1 
    }

    let updatedCartItem = await axios.put(updateCartItemUrl, updateCartItemBody, reqHeaders)
    // console.log("updatedCartItem.data: ", updatedCartItem.data)

    // Update cart: add to cart.total_price
    let updateCartUrl = "https://store2-backend.herokuapp.com/api/carts/" + cart.id
    let updateCartBody = {
      "total_cost": cart.total_cost + product.price
    }

    let updatedCart = await axios.put(updateCartUrl, updateCartBody, reqHeaders)
    // console.log("updated cart.data: ", updatedCart.data)
    setCart(updatedCart.data)
  };

  let handleAddSubmit = async (cart, product) => {
    let res1;

    try {
      res1 = await checkProductInCart(cart, product)
      // returns either "false" OR the cart_item object 
      // console.log("res1 from handleAddSubmit: ", res1)
    } catch (err){
        console.log("error checking if item in cart: ", err)
    }

      if (!res1){
        try {
          let res2 = await handleAddNewToCart(product, cart)
          // console.log("newly added cart item and updated cart: ", res2)
        } catch (err){
          console.log("error adding new item to cart: ", err)
        }
      } 
      
      else if (res1){
        try {
          // console.log("product already in cart")
          // update quantity for existing cart object AND update cart's total_cost
          let res2 = await handleAddExistingToCart(cart, product)
          // console.log('res2 from handleAddExistingToCart: ', res2.data)
        } catch (err){
          console.log("error adding existing item to cart: ", err)
        }
      }
    } 

  return (
    <div style={{ }}>
      {/* { console.log("initial cart from ProductCard: ", cart) }  */}
      <Card style={{ maxWidth: "50vh", marginBottom: "3vh", marginTop: "3vh", minHeight: "60vh" }}>
        <Card.Img variant="top" src={productData.image} />
        <Card.Body>
          <Card.Title>{productData.brand}: {productData.name}</Card.Title>
           <Card.Text data-testid="all-products-product-description">{productData.description}</Card.Text>
           <Card.Text>Price: {productData.price}</Card.Text>
           <Button onClick={() => {handleAddSubmit(cart, productData)}} data-testid="add-product-button" >ADD</Button>
        </Card.Body>
      </Card>      
    </div>
  );
}

export default ProductCard;