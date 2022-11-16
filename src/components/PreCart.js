import React from 'react'
import { useLocation } from 'react-router-dom';
import Image from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'


export default function PreCart() {
    const navigate = useNavigate()
    const location = useLocation();
    const photo = location.state.photo
    const brand = location.state.brand
    const description = location.state.description
    const price = location.state.price

    return (
        <>
            <div className='p-24 grid grid-cols-2 justify-items-center'>
                <div>
                    <Image src={photo} />
                </div>
                <div className=''>
                    <h1>{brand}</h1>
                    <p>{description}</p>
                    <p>${price}</p>
                    <div className='flex gap-2 mb-10'>
                        <Button className='w-14'>S</Button>
                        <Button className='w-14'>M</Button>
                        <Button className='w-14'>L</Button>
                        <Button className='w-14'>XL</Button>
                        <Button className='w-14'>XXl</Button>
                    </div>
                    <Button className='w-[50%] mb-10 ' onClick={navigate()}>Add To Cart</Button>
                    
                </div>
                
                
            </div>
        </>
        
    )
}
