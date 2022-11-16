import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useLocation } from 'react-router-dom';


export default function SelectedPartner() {
    const [info, setInfo] = useState([])
    const location = useLocation()
    const id = location.state.id
    
    const fetchPartner = async () => {
       await fetch("http://localhost:8000/selectedPartner",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ id: id})
        })
        .then(res => res.json())
        .then(res => setInfo(res))
        .catch((res) => {
            console.log(res)
        })
        
    }


console.log(info)

    useEffect(() => {
     fetchPartner()
    }, [])
    
  return (
      <div>
          {info.map(product => {
              return(<ProductCard  brand={product.products[0].name} description={product.products[0].description} price={product.products[0].price} />)
          })}
          
    </div>
  )
}
