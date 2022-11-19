import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import PartnerUpload from './PartnerUpload';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AddProductModal from './AddProductModal';
import { v4 as uuidv4 } from 'uuid';

export default function Admin() {
    const [companyName, setCompanyName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [state, setState] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const partnerId = uuidv4()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
    const [rating, setRating] = useState('null')
    const [companyLogo, setCompanyLogo] = useState('')
    const [companyLogoStorageUrl, setCompanyLogoStorageUrl] = useState('')
    const [products, setProducts] = useState([])
    const handleAddedProduct = (productName, productPrice, description, productPhoto, productPhotoUrl) => {
        setProducts(
            [...products,
            {
                productName: productName,
                productPrice: productPrice,
                description: description, 
                productPhoto: productPhoto,
                productPhotoUrl: productPhotoUrl
            }
        ])            
    }



    const uploadImage = async (e) => {
        e.preventDefault()
        let postId = `${companyName} - ${uuidv4()}`
        setCompanyLogo(postId)
        let file = e.target.files[0]
        let blob = file.slice(0, file.size, 'image/jpeg')
        let newfile = new File([blob], `${postId}`, { type: 'image/jpeg' })
        let data = new FormData()
        data.append('file', newfile)
        await axios.post(`http://localhost:8000/uploadPhotoLogo`, data )
            .then(res => {
            setCompanyLogoStorageUrl(res.data)
            console.log(res.data, 'ADMIN')
            console.log(res.statusText)
        })
    }
   

  return (
    <div className=' grid grid-cols-2 place-content-center m-4 '>
          <>
        <div>
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
            <Form.Control type="file"  name='file' accept='image/*' onChange={uploadImage}/>
        </Form.Group>
            <div className='grid grid-cols-2'>
                <div>
                    < AddProductModal handleAddedProduct={handleAddedProduct}/> 
                </div>
            
                <PartnerUpload        
                    companyName={companyName}
                    companyLogo={companyLogo} 
                    companyLogoStorageUrl={companyLogoStorageUrl}          
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
              </div>
    
              <div className='grid place-content-center'>
                 
                  {products.map(product => {
                      return (
                    
                          product.productName
                      )
                  })

                  }
              </div>
        </>
    </div>
  )
}
