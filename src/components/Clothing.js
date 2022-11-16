import React, { useEffect, useState } from 'react'
import coatPhoto from '../assets/coatPhoto.webp'
import FeaturedPartnersCard from './FeaturedPartnersCard'
import { useNavigate } from 'react-router-dom'


export default function ClothingProductPage() {
  const [partnersInfo, setPartnersInfo] = useState([])
  const [id, setId] = useState('')
  const navigate = useNavigate()

  const fetchPartnersInfo = () => {
    fetch("/apparalPartners")
    .then(res => res.json())
    .then(res => setPartnersInfo( res ))
    .catch(err => err)
  }
  useEffect(() => {
    fetchPartnersInfo()
  }, [])
  
  return (
    <>
      <div className='grid grid-cols-4'>
      {partnersInfo.map((partner) => {
        return (
         
          <div className='w-fit' key={partner.id} onClick={()=> setId(partner.partnerId)}>
            <a onClick={() =>
              navigate('/SelectedPartner', { state: { id: partner.partnerId } })}>
              <FeaturedPartnersCard photo={coatPhoto} brandName={partner.companyName} rating={partner.rating} id={partner.partnerId} /> 
            </a>
          </div>
        )
      })}
     
      </div>
    </>
         
  )
}