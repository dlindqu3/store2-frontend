import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCardHome({ productData }) {

  return (
    <div style={{ }}>
      <Card style={{ maxWidth: "50vh", marginBottom: "3vh", marginTop: "3vh", minHeight: "55vh" }}>
        <Card.Img variant="top" src={productData.image} />
        <Card.Body>
          <Card.Title>{productData.brand}: {productData.name}</Card.Title>
           <Card.Text>{productData.description}</Card.Text>
        </Card.Body>
      </Card>      
    </div>
  );
}

export default ProductCardHome;