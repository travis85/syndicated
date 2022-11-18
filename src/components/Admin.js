import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  PartnerUpload  from './PartnerUpload';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import AddProductModal from './AddProductModal';

export default function Admin() {
    const [show, setShow] = useState(false);
    const [companyName, setCompanyName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [state, setState] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [partnerId, setPartnerId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
    const [rating, setRating] = useState('null')
    const [products, setProducts] = useState([
        {
            productName: '',
            productPrice: '',
            description: '',
            photo: ''
        }
    ])
    const handleAddedProduct = (productName, productPrice, description, photo) => {
        setProducts(
             [...products,
            {
                productName: productName,
                productPrice: productPrice,
                description: description, 
                photo: photo
            }
        ])
            
            

           
    }



    const uploadImage = async (e) => {
        e.preventDefault()
        let postId = 'new Photo'
        let file = e.target.files[0]
        let blob = file.slice(0, file.size, 'image/jpeg')
        let newfile = new File([blob], `${postId}_post.jpeg`, { type: 'image/jpeg' })
        let data = new FormData()
        data.append('file', newfile)
        await axios.post(`http://localhost:8000/uploadPhoto`, data )
            .then(res => {
            console.log(res.data, 'ADMIN')
            console.log(res.statusText)
        })
    }
   

  return (
    <div className='w-[50%] grid place-content-center m-4'>
        <>
    <Form>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Company Name" onChange={(e)=> {setCompanyName(e.target.value)}}/>
            </Form.Group>
            <Form.Group as={Col} controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option onChange={(e)=> {setType(e.target.value)}}>Apperal</option>
                </Form.Select>
            </Form.Group> 
                 
            </Row>
        <Form.Group as={Col} controlId="contactPerson" className='mb-3'>
          <Form.Label>Contact Person</Form.Label>
          <Form.Control type="text" placeholder="Contact Person" onChange={(e)=> {setContactPerson(e.target.value)}}/>
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone Numebr</Form.Label>
                <Form.Control placeholder="(123) 456 7890" onChange={(e)=> {setPhoneNumber(e.target.value)}}/>
            </Form.Group> 
            <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}/>
             </Form.Group> 
                   
        </Row>
      

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" onChange={(e)=> {setAddress(e.target.value)}}/>
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={(e)=> {setCity(e.target.value)}}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control onChange={(e)=> {setState(e.target.value)}}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control onChange={(e)=> {setZipCode(e.target.value)}}/>
            </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="photo">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file"  name='file' accept='image/*' onClick={uploadImage}/>
        </Form.Group>
                  <div className='grid grid-cols-2'>
                      <div>
                          < AddProductModal handleAddedProduct={handleAddedProduct}/> 
                      </div>
            
            <PartnerUpload
                companyName={companyName}
                contactPerson={contactPerson}
                partnerId={partnerId}
                phoneNumber={phoneNumber}
                email={email}
                products={products}
                rating={rating}
                type={type}
                address={address}
                city={city}
                state={state}
                zipCode={zipCode}
            />
        </div>
        
    </Form>
        </>
    </div>
  )
}
