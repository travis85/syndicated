import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Image from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDropdown } from 'react-icons/io';
import { IoIosArrowDropup } from 'react-icons/io';
import LoadinFunction from '../utils/LoadinFunction';
import { currencyFormatter } from '../utils/currencyFormatter';

export default function PreCart() {
    const navigate = useNavigate()
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const photo = location.state.photo
    const brand = location.state.brand
    const description = location.state.description
    const productId = location.state.productId
    const price = location.state.price
    const [cart, setCart] = useState([])
    const [size, setSize] = useState('')
    const [quanity, setQuanity] = useState(1)
    const [total, setTotal] = useState(Number(price) * quanity)

    const stateData = {
        productId: productId,
        photo: photo,
        size: size,
        quanity: quanity,
        total: total,
    }
    const decrement = () => {
        if (quanity > 1) {
            setQuanity(quanity - 1)
            setTotal(quanity * Number(price))
        } else {
            return
        }  
    }
    const increment = () => {
        setQuanity(quanity + 1)
        setTotal(quanity * Number(price))
    }
    const handelAddToCart = () => {
        setTotal(quanity * Number(price))
        setCart((cart)=>[...cart, stateData])
        navigate(-1, { state: cart})

    }

    const handleCheckOut = () => { }
    
    useEffect(() => {
        setTotal(Number(price) * quanity)
    }, [quanity]);
    
console.log(total, cart,'skva')
    return (
        <>
            {loading ? <LoadinFunction /> :
                <div className='p-24 grid grid-cols-2 justify-items-center'>
                    <div>
                        <Image src={photo} />
                    </div>
                    <div className=''>
                        <h1>{brand}</h1>
                        <p>{description}</p>
                        <p>{currencyFormatter.format(price) }</p>
                        <div className='flex gap-2 mb-10'>
                            <button className='w-14' value={'S'} onClick={(e) => { setSize(e.target.value) }}>S</button>
                            <button className='w-14' value={'M'} onClick={(e) => { setSize(e.target.value) }}>M</button>
                            <button className='w-14' value={'L'} onClick={(e) => { setSize(e.target.value) }}>L</button>
                            <button className='w-14' value={'XL'} onClick={(e) => { setSize(e.target.value) }}>XL</button>
                            <button className='' value={'XXL'} onClick={(e) => { setSize(e.target.value) }}>XXL</button>
                        </div>
                        <div className='flex' >
                            <button onClick={increment} className='mr-2'>< IoIosArrowDropup /></button>
                            <p>{quanity}</p>
                            <button onClick={decrement} className='ml-2'>< IoIosArrowDropdown /></button>
                            <p>{currencyFormatter.format(price * quanity) }</p>
                        </div>
                        <Button className='w-[50%] mb-10 ' onClick={handelAddToCart}>Add To Cart</Button>
                        <Button className='w-[50%] mb-10 ' onClick={handleCheckOut}>Check out</Button>
                    </div>
                </div>
            }
        </>
        
    )
}
