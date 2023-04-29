import React, { useEffect, useState } from 'react'
import ProductCardHome from '../components/ProductCardHome'
import axios from 'axios'

function Home() {

  const [errorText, setErrorText] = useState()
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //Runs only on the first render
    let baseURL = "http://127.0.0.1:8000"
    let queryUrl = baseURL + '/api/products'

    let getProducts = async () => {
    try {
      console.log("useEffect running")
    // console.log('currentUser: ', currentUser, "currentToken: ", currentToken)
      let resData = await axios.get(queryUrl, {
        headers:{
          "Accept": "application/json"
        }
      })

      let productsArray = resData.data
      console.log('productsArray: ', productsArray)
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

    {/* { currentUser && console.log(currentUser, ' currentUser from AllProducts')} */}
    {/* {currentToken && console.log(currentToken, ' currentToken from allProducts')} */}
      <h2>Home page AA</h2>

      {isLoading && <p>Loading...</p>}

      <div>
      {products && products.map((item) => {
          return <ProductCardHome productData={item} key={item._id} />
      })}
      </div>
      {errorText && console.log('error text: ', errorText)}
    </div>
  )
}

export default Home