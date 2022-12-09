import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function AddProductModal({addProduct}) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [productPhoto, setProductPhoto] = useState('')
    const [productPhotoUrl, setProductPhotoUrl] = useState('')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [description, setDescription] = useState('')
  const handleAddProduct = async() => {
    addProduct(description, productPrice, productPhotoUrl, productPhoto, productName)
    handleClose()
    }
    const handleClose =  () => { setShow(false)};
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
          console.log(res.data, 'UploadImage')
      })
    }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text"placeholder="Name" onChange={(e) => setProductName(e.target.value)} autoFocus />
            </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="text" placeholder="$0" onChange={(e) => setProductPrice(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                    <InputGroup className="mb-3">
                    <Form.Control type="file" name='file' accept='image/*' onChange={uploadImage}/>
                </InputGroup>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddProduct}> Save </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
