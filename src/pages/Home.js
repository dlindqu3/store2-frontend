import React, { useEffect, useState } from 'react'
import ProductCardHome from '../components/ProductCardHome'
import axios from 'axios'


function Home() {

  const [errorText, setErrorText] = useState()
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //Runs only on the first render
    let baseURL = "https://store2-backend.herokuapp.com"
    let queryUrl = baseURL + '/api/products'

    let getProducts = async () => {
    try {
    // console.log('currentUser: ', currentUser, "currentToken: ", currentToken)
      let resData = await axios.get(queryUrl, {
        headers:{
          "Accept": "application/json"
        }
      })
      console.log("resData from home useEffect: ", resData); 
      let productsArray = resData.data
      setProducts(productsArray)
    } catch (err){
      setErrorText(err.message)
      console.log("Error:", err.message)
    }
    }  
    getProducts()
    setIsLoading(false)
  }, []);


  return (
    <div>
      <h2 style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }} data-testid="headerTestId">Home</h2>
      
      {/* { products && <p data-testid="description1"> { products[0]["description"] }</p> } */}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginLeft: "4vh", marginRight: "4vh" }}>
      {products && products.map((item) => {
          return <ProductCardHome productData={item} key={item.id} />
      })}
      </div>
      {errorText && console.log('error text: ', errorText)}
    </div>
  )
}

export default Home