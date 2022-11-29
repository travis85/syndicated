import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import GetRating from './GetRating';

export default function FeaturedPartnersCard({ photo, ratingsArray, brandName, id }) {

  return (
    <div>
      <Card style={{ width: '18rem' }} className='m-4'>
        <Card.Body className='grid justify-items-center'>
          <Image src={photo} className='h-60' />
          <Card.Title>{brandName}</Card.Title>
          <div>
            <GetRating ratingsArray={ratingsArray}/>
          </div>
        </Card.Body>
      </Card>
        
    </div>
  )
}
