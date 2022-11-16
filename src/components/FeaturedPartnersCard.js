import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { AiOutlineStar } from 'react-icons/ai';

export default function FeaturedPartnersCard({ photo, rating, brandName, id }) {

  return (
    <div>
      <Card style={{ width: '18rem' }} className='m-4'>
        <Card.Body className='grid justify-items-center'>
            <Image src={photo} fluid />
          <Card.Title>{brandName}</Card.Title>
          <div className='flex'>
            <AiOutlineStar className='text-yellow-500'/>
            <AiOutlineStar className='text-yellow-500' />
            <AiOutlineStar className='text-yellow-500'/>
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        </Card.Body>
      </Card>
        
    </div>
  )
}
