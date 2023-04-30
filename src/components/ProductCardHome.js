import React from "react";
import Card from "react-bootstrap/Card";

function ProductCardHome({ productData }) {

  return (
    <div style={{ }}>
      <Card style={{ width: "30vw", marginBottom: "3vh", marginTop: "3vh" }}>
        <Card.Img variant="top" src={productData.image} style={{ width: "25vw" }}/>
        <Card.Body>
          <Card.Title>{productData.brand}: {productData.name}</Card.Title>
           <Card.Text>{productData.description}</Card.Text>
        </Card.Body>
      </Card>      
    </div>
  );
}

export default ProductCardHome;