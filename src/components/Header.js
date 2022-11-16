import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {

    return (
        <div className='h-14 grid grid-cols-2 place-content-center bg-gray-100'>
            <div className='flex pl-4'>
                <h1 className='text-xl'>SYNDICATED</h1>
            </div>
            <div className='flex gap-4 place-self-end pr-2'>
                <Link to={'/'} className='no-underline'>HOME</Link>
                <Nav >
                    <NavDropdown title="SHOP" id="navbarScrollingDropdown" className=''>
                        <NavDropdown.Item href='./Clothing'>Clothing</NavDropdown.Item>
                        <NavDropdown.Item >Shoes</NavDropdown.Item>
                        <NavDropdown.Item >Lawn Care</NavDropdown.Item>
                        <NavDropdown.Item >Construction</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Link className='no-underline'>ABOUT</Link>
                <Link className='no-underline'>CART</Link>
                
            </div>

        </div>
    )
}


