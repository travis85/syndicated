import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useLocation } from 'react-router-dom';
import LoadinFunction from '../utils/LoadinFunction';
import axios from 'axios';
import ReviewModal from './ReviewModal';

export default function SelectedPartner({ cartItems }) {
    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [reviews, setReviews] = useState([])
    const location = useLocation()
    const id = location.state.id
    const fetchPartner = async () => {
        setLoading(true)
        await fetch("https://syndicatedserver-371000.uc.r.appspot.com/selectedPartner",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ id: id})
        })
        .then(res => res.json())
        .then(res => setInfo(res) )
        .then( setCompanyName(info[0].companyName) )
        .then( setReviews(info[0].reviews) )
        .then( setLoading(false) )
        .catch((res) => { console.log(res) })
    }
    const updateData = async (review, rating) => {
        setLoading(true)
        const id = info[0].partnerId
        const partnerId = { partnerId: id }
        const ratings = {rating: rating}
        let udatedData = Object.assign(review, partnerId)
        await axios.post('https://syndicatedserver-371000.uc.r.appspot.com/updatePartnerProfile', udatedData)
        .then(res => { setReviews([res.data]) })
        .then( setLoading(false) )
    }

    useEffect(() => {
        fetchPartner()
    },[info])
    
    return (
      
        <div className='grid grid-cols-3 p-4'>
           
            {loading ? < LoadinFunction /> :
            <div>
                <h1>{companyName}</h1>
                <div>
                    <h6>Reviews</h6>
                    {reviews.map(review => {
                        return (
                            <div key={`${review.name}+${review.comment}`}>
                                <p>
                                    <span className='mr-4'>{review.name}:</span> {review.comment}
                                </p>
                            </div>
                        )
                    })} 
                    <ReviewModal updateData={ updateData}/>
                </div>
                
            </div>} 
            
            <div className='grid col-span-2 grid-cols-3 '>
                {info.map(product => {
                    
                    return (
                                                    
                        product.products.map((product) =>
                            
                            <div className='' key={product.productId}>
                                <ProductCard
                                    companyName={companyName}
                                    brand={product.productName}
                                    description={product.description}
                                    price={product.productPrice}
                                    photo={product.productPhotoUrl}
                                    productId={product.productId}
                                />
                            </div>
                        
                        )
                            
                    )
                   
                                                    
                })}
            </div>
        </div>
    )
}
