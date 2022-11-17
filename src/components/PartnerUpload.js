import React from 'react'
import Button from 'react-bootstrap/esm/Button';

export default function PartnerUpload({
    companyName ,
    contactPerson,
    partnerId,
    phoneNumber,
    email,
    products,
    rating,
    type }) {
    
    const handleSubmit = async() => {
        await fetch("http://localhost:8000/uploadPartnerToFirestore",
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            companyName,
            contactPerson,
            partnerId,
            phoneNumber,
            email,
            products,
            rating,
            type
        })
    })
    .then(res => res.json())
    }

  return (
      <div>
          <Button onClick={handleSubmit}>click </Button>
    </div>
  )
}

