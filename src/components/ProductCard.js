import React from 'react'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ photo, brand, description, price }) {
    const navigate = useNavigate()

    return (
        <a className='no-underline text-gray-700' onClick={() =>
            navigate('/PreCart', {
                state: {
                    photo:photo,
                    brand: brand,
                    description: description,
                    price: price
                }
            }
        )}>
            <Card style={{ width: '18rem' }} className='m-4'>
                <Card.Body className='grid justify-items-center'>
                    <Image src={photo} fluid />
                    <Card.Title>{brand}</Card.Title>
                    <div className='grid justify-items-center'>
                        <div>
                            {description} 
                        </div>
                        <div className='text-muted'>
                            {price} 
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </a>
         
        
    )
}
