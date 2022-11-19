import React from 'react'
import Button from 'react-bootstrap/esm/Button';

export default function PartnerUpload({
    companyName,
    companyLogo,
    companyLogoStorageUrl,
    contactPerson,
    partnerId,
    phoneNumber,
    email,
    products,
    rating,
    type,
    address,
    city,
    zipCode,
  state }) {
  

    const handleSubmit = async() => {
        await fetch("http://localhost:8000/uploadPartnerToFirestore",{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          companyName,
          companyLogo,
          companyLogoStorageUrl,
          contactPerson,
          partnerId,
          phoneNumber,
          email,
          products,
          rating,
          type,
          address,
          city,
          zipCode,
          state
        })
    })
    .then(res => res.json())
    }

  return (
    <div>
        <Button onClick={handleSubmit}>Create Profile</Button>
    </div>
  )
}

