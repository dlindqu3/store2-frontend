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
  }

  let handleAddToCart = async (productData) => {
    
  };

  let updateCartTotalCost = async (cartId, cartItemsArray) => {
    
  };

  return (
    <div style={{ }}>
      <Card style={{ maxWidth: "50vh", marginBottom: "3vh", marginTop: "3vh", minHeight: "60vh" }}>
        <Card.Img variant="top" src={productData.image} />
        <Card.Body>
          <Card.Title>{productData.brand}: {productData.name}</Card.Title>
           <Card.Text>{productData.description}</Card.Text>
           <Button onClick={() => {checkProductInCart(cart, productData)}} >ADD</Button>
        </Card.Body>
      </Card>      
    </div>
  );
}

export default ProductCard;