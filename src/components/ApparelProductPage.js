import React, { useEffect, useState } from 'react'
import FeaturedPartnersCard from './FeaturedPartnersCard'
import { useNavigate } from 'react-router-dom'
import LoadinFunction from '../utils/LoadinFunction'

export default function ApparelProductPage({ cartItems }) {
  const [loading, setLoding] = useState(false)
  let [partnersInfo, setPartnersInfo] = useState([])
  partnersInfo = partnersInfo.flat()
  const navigate = useNavigate()
  
  const fetchPartnersInfo = async () => {
    setLoding(true)
    await fetch("https://syndicatedserver-371000.uc.r.appspot.com/apparalPartners")
    .then(res => res.json())
    .then(res => setPartnersInfo(res))
    .then(setLoding(false))
    .catch(err => err)
  }

  console.log(partnersInfo)
  useEffect(() => {
    fetchPartnersInfo()
  },[])
  
  return (
    <>
      {loading ? < LoadinFunction /> :

        <div className='grid grid-cols-4'>
        
          {
            partnersInfo.map((partner) => {
              const ratings = partner.reviews.map((rating) => rating.rating)
          
              return (
         
                <div className='w-fit ' key={partner.partnerId} >
                  <a href='' onClick={() =>
                    navigate('/SelectedPartner', { state: { id: partner.partnerId } })}>
                    <FeaturedPartnersCard photo={partner.companyLogoStorageUrl} brandName={partner.companyName} ratingsArray={ratings} id={partner.partnerId} />
                  </a>
                </div>
              )
            })
          }
        
        </div>
      }
    </>
         
  )
}
