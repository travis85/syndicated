import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useLocation } from 'react-router-dom';
import axios from 'axios'


export default function SelectedPartner() {
    const [info, setInfo] = useState([])
    const location = useLocation()
    const id = location.state.id
    
    const fetchPartner = () => {
        axios.post(`http://localhost:8000/selectedPartner`, id)
            
            .then((res) => {
            console.log(res,'DATA')

            const info = res.data[0].products
            setInfo(info)
        })
        .catch(err => err)
    }

    console.log(info)



    useEffect(() => {
     fetchPartner()
    }, [])
    
  return (
      <div>
          {info.map(product => {
              return(<ProductCard  brand={product.name} description={product.description} price={product.price} />)
          })}
          
    </div>
  )
}
