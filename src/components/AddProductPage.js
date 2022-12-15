import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


export default function AddProductPage () {
  const navigate = useNavigate()
  const location = useLocation();
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [description, setDescription] = useState('')
  const [productPhoto, setProductPhoto] = useState('')
  const [productPhotoUrl, setProductPhotoUrl] = useState('')
  
  const handleAddedProduct = (e) => {
    e.preventDefault();
    setProducts(
      [...products, {
        productId: uuidv4(),
        productName: productName,
        productPrice: productPrice,
        description: description, 
        productPhoto: productPhoto,
        productPhotoUrl: productPhotoUrl
      }]
    ) 
   
  }
  const navigateToLandingPage = ()=> {
    navigate('/')
  }
  
  const handleCreateProfile = async() => {
    navigateToLandingPage()
    await fetch("https://syndicatedserver-371000.uc.r.appspot.com/uploadPartnerToFirestore", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        reviews:[],
        address: location.state.address,
        companyName: location.state.companyName,
        companyLogo: location.state.companyLogo,
        companyLogoStorageUrl: location.state.companyLogoStorageUrl,
        city: location.state.city,
        contactPerson: location.state.contactPerson,
        email: location.state.email,
        partnerId: location.state.partnerId,
        phoneNumber: location.state.phoneNumber,
        products:products,
        type: location.state.type,
        zipCode: location.state.zipCode,
        state: location.state.state
      })
    })
  }
  const uploadImage = async (e) => {
    e.preventDefault()
    let postId = `${productName} - ${uuidv4()}`
    setProductPhoto(postId)
    let file = e.target.files[0]
    let blob = file.slice(0, file.size, 'image/jpeg')
    let newfile = new File([blob], `${postId}`, { type: 'image/jpeg' })
    let data = new FormData()
    data.append('file', newfile)
    await axios.post(`https://syndicatedserver-371000.uc.r.appspot.com/uploadPhotoProduct`, data )
    .then(res => {
    setProductPhotoUrl(res.data)
    console.log(res.data, 'ADMIN')
    })
  }
 
  return (
    <>
    <div className='grid place-content-center m-4'>
      <div className='border-solid border-2 p-6 rounded-md shadow-xl'>
        <Form className='' id='form'>
          <Row>
            <Form.Group as={Col} controlId="companyName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)}   />
            </Form.Group>
            <Form.Group as={Col} controlId="companyName" className='mb-3'>
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="text" placeholder="Product Price" onChange={(e)=> setProductPrice(e.target.value) }/>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e)=> setDescription(e.target.value) }/>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="formGridFeaturedProducts">         
            <Form.Label>Add photo</Form.Label>
            <Form.Control type="file" name='file' accept='image/*' onChange={uploadImage} className='mb-3'/>
          </Form.Group> 
          <Button onClick={handleAddedProduct} className='mr-2'>Add Product</Button>
          <Button onClick={handleCreateProfile}>Create Profile</Button>

        </Form>
        </div>
        {products.length > 0 &&
          <div>
            <p>Your added products</p>
            {products.map((product) => {
              return (
                product.productName
              )
            })}
          </div>
        }
    </div> 
    </>
  );
}



