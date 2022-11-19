import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


export default function ({handleAddedProduct}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    handleAddedProduct(productName, productPrice, description, productPhoto, productPhotoUrl)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [description, setDescription] = useState('')
  const [productPhoto, setProductPhoto] = useState('')
  const [productPhotoUrl, setProductPhotoUrl] = useState('')
  
  const uploadImage = async (e) => {
    e.preventDefault()
    let postId = `${productName} - ${uuidv4()}`
    setProductPhoto(postId)
    let file = e.target.files[0]
    let blob = file.slice(0, file.size, 'image/jpeg')
    let newfile = new File([blob], `${postId}`, { type: 'image/jpeg' })
    let data = new FormData()
    data.append('file', newfile)
    await axios.post(`http://localhost:8000/uploadPhotoProduct`, data )
    .then(res => {
    setProductPhotoUrl(res.data)
    console.log(res.data, 'ADMIN')
    })
  }
  console.log(productPhotoUrl)
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={ handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Row>
                    <Form.Group as={Col} controlId="companyName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Product Name" onChange={(e)=> setProductName(e.target.value)  }/>
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
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>handleClose() }>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

