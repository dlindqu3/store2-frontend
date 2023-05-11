import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

function AllProducts({ currentUsername, currentToken, currentEmail, currentUserId, cart, setCart }) {

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
      <h2 style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>Products </h2>

      {isLoading && <p>Loading...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: "4vh", marginRight: "4vh" }}>
      {products && products.map((item) => {
          return <ProductCard currentToken={currentToken} productData={item} key={item.id} cart={cart} setCart={setCart} />
      })}
      </div>
      {errorText && console.log('error text: ', errorText)}
    </div>
  )
}

export default AllProducts