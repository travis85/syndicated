import React, { useEffect, useState } from 'react'
import FeaturedPartnersCard from './FeaturedPartnersCard'
import { useNavigate } from 'react-router-dom'

export default function ApparelProductPage() {
  let [partnersInfo, setPartnersInfo] = useState([])
  partnersInfo = partnersInfo.flat()
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
      <div >
        {partnersInfo.map((partner) => {
            return (
         
          <div className='w-fit' key={partner.partnerId} >
            <a href='' onClick={() =>
              navigate('/SelectedPartner', { state: { id: partner.partnerId } })}>
              <FeaturedPartnersCard photo={partner.companyLogoStorageUrl} brandName={partner.companyName} rating={partner.rating} id={partner.partnerId} /> 
            </a>
          </div>
        )
         
        
      })}
     
      </div>
    </>
         
  )
}
