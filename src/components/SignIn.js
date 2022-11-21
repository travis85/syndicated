import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function SignIn() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [partnerData, setPartnerData] = useState([])
    const navigate = useNavigate()

    const navigateToProfilePage = (partnerData) => {
        navigate('/PartnerProfilePage', {state: {partnerData: partnerData}})
    }
    const fecthPartnerProfile = async() => {
        const emailPassword = {email: email, password: password}
        await axios.post(`http://localhost:8000/fetchPartnerProfile`, emailPassword)
        .then(res => {
            navigateToProfilePage(res.data[0])
        })
         
    }
    

    return (
        <div>
            <Form className='w-[50%]'> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary"  onClick={fecthPartnerProfile}>
                    Sign In
                </Button>
            </Form>
        </div>
    )
}
