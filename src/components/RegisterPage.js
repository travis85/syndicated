import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/esm/Button';
import loginValidation from '../utils/LoginValidationRules'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate()
    const navigateToNextPage = () => {
        navigate('/AddProductPage', { state:
            { 
                companyName: companyName,
                address: address,
                city: city,
                zipCode: zipCode,
                state: state,
                contactPerson: contactPerson,
                partnerId: partnerId,
                phoneNumber: phoneNumber,
                email: email,
                type: type,
                rating: rating, 
                companyLogo: companyLogo,
                companyLogoStorageUrl: companyLogoStorageUrl
            }
        })
    }
    const [validated, setValidated] = useState(false);
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
    const typeSet = (e) => {setType(e.target.value)}
    const [rating, setRating] = useState('null')
    const [companyLogo, setCompanyLogo] = useState('')
    const [companyLogoStorageUrl, setCompanyLogoStorageUrl] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState([])


    const handleContinue = async (event) => {
        const values = {
            email: email,
            password: password,
            password2: password2
        }
        const form = event.currentTarget;
        const errorsArray = Object.keys(loginValidation(values))
        if (errorsArray.length > 0) {
            const newArray = Object.values(loginValidation(values))
            setErrors(errors => [...errors, newArray])
            clearError()
        } else if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            //NAVIGATE HERE!!!!!
            const emailPassword = {email: email, password: password}
            await axios.post(`http://localhost:8000/createAuthToFirebase`, emailPassword )
            .then(res => {
                console.log(res.data, 'Auth')
                setPassword('')
                setPassword2('')
                navigateToNextPage()
            })

           
        }
        setValidated(true);
       
    };
    const clearError = ()=> {
        setTimeout(() => {
            setErrors([])
        },3000)
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
            .then( res => {
            setCompanyLogoStorageUrl(res.data)
            console.log(res.data, 'UploadImage')
        })
    }

    return (
        <>
        <ul>
            {errors.flat(1).map((error,index) => {
                return (
                    <li key={index}>
                        {error}
                    </li> 
                )
            })}
        </ul>
        <div className=' grid grid-cols-2 place-content-center m-4 '>
            <div>
                
                <Form noValidate validated={validated}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control required type="text" placeholder="Company Name" onChange={(e)=> {setCompanyName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Select required defaultValue="Choose..." onChange={typeSet}>
                                <option>Choose...</option>
                                <option value='Apparel' >Apparel</option>
                                <option value='Food' >Food</option>
                                <option value='Misc' >Misc...</option>
                            </Form.Select>
                        </Form.Group> 
                            
                    </Row>
                    <Form.Group as={Col} controlId="contactPerson" className='mb-3'>
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control required type="text" placeholder="Contact Person" onChange={(e)=> {setContactPerson(e.target.value)}}/>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone Numebr</Form.Label>
                            <Form.Control required placeholder="(123) 456 7890" onChange={(e)=> {setPhoneNumber(e.target.value)}}/>
                        </Form.Group> 
                        <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}/>
                        </Form.Group> 
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="contactPerson" className='mb-3'>
                            <Form.Label>Create Password</Form.Label>
                            <Form.Control required type="text" placeholder="123Abc*#@!*" onChange={(e)=> {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="contactPerson" className='mb-3'>
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control required type="text" placeholder="123Abc*#@!*" onChange={(e)=> {setPassword2(e.target.value)}}/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control required placeholder="Apartment, studio, or floor" onChange={(e)=> {setAddress(e.target.value)}}/>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control required onChange={(e)=> {setCity(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control required onChange={(e)=> {setState(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control required onChange={(e)=> {setZipCode(e.target.value)}}/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="photo">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control type="file"  name='file' accept='image/*' onChange={uploadImage}/>
                    </Form.Group>
                    <Button onClick={handleContinue}>continue</Button>
                </Form>
            </div>
        </div>
        </>
    )
}
