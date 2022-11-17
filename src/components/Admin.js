import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  PartnerUpload  from './PartnerUpload';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



export default function Admin() {
    const [companyName, setCompanyName] = useState('')
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
    <div className='w-[50%] grid place-content-center '>
        <>
    <Form>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Company Name" />
            </Form.Group>
            <Form.Group as={Col} controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>Apperal</option>
                </Form.Select>
                        </Form.Group> 
                <Form.Group className="mb-3" controlId="formGridFeaturedProducts">
            <Form.Label>Featured Products</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>          
        </Row>
                  
        <Form.Group as={Col} controlId="contactPerson" className='mb-3'>
          <Form.Label>Contact Person</Form.Label>
          <Form.Control type="text" placeholder="Contact Person" />
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone Numebr</Form.Label>
                <Form.Control placeholder="(123) 456 7890"/>
            </Form.Group> 
            <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Email"/>
             </Form.Group> 
                   
        </Row>
      

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

       
         <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>
        <Form.Group className="mb-3" controlId="photo">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file"  name='file' accept='image/*' onClick={uploadImage}/>
        </Form.Group>
     
        <PartnerUpload companyName={companyName}/>
      
    </Form>
        </>
    </div>
  )
}
        // <Form >
        //     <Form.Group className="mb-3" controlId="companyName">
        //         <Form.Label>Comapany Name</Form.Label>
        //             <Form.Control type="text"  name='companyName' onChange={(e) => {
        //                 e.preventDefault()
        //                 setCompanyName(e.target.value)
        //             }}/>
        //     </Form.Group>
        //     <Form.Group className="mb-3" controlId="photo">
        //         <Form.Label></Form.Label>
        //         <Form.Control type="file"  name='file' accept='image/*' onClick={uploadImage}/>
        //     </Form.Group>
        //     <PartnerUpload companyName={companyName}/>
            
        // </Form>
