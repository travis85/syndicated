import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';

export default function GetRating({ ratingsArray }) {
    const rating = Math.floor(ratingsArray.reduce((a,b) => Number(a) + Number(b), 0) / ratingsArray.length)
    const starColorYellow = 'text-yellow-500'
    const starColorGray = 'text-gray-500'

  return (
      <div>
        { ratingsArray.length === 0 ? 
            <p className=''>not rated yet</p> :
            <div className='flex'>
                <AiOutlineStar className={rating >= 1 ? starColorYellow : starColorGray }/>
                <AiOutlineStar className={rating >= 2 ? starColorYellow : starColorGray }/>
                <AiOutlineStar className={rating >= 3 ? starColorYellow : starColorGray }/>
                <AiOutlineStar className={rating >= 4 ? starColorYellow : starColorGray }/>
                <AiOutlineStar className={rating >= 5 ? starColorYellow : starColorGray }/>
            </div>
        }
    </div>
  )
}
