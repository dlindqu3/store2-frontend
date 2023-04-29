import React from "react";
import Card from "react-bootstrap/Card";

function ProductCardHome({ productData }) {

  return (
    <div style={{ }}>
      <Card style={{ minWidth: "18rem", width: "35rem", marginBottom: "10px", marginTop: "10px" }}>
        <Card.Img variant="top" src={productData.image} style={{ maxWidth: "10rem" }}/>
        <Card.Body>
          <Card.Title>{productData.brand}: {productData.name}</Card.Title>
           <Card.Text>{productData.description}</Card.Text>
        </Card.Body>
      </Card>      
    </div>
  );
}

export default ProductCardHome;