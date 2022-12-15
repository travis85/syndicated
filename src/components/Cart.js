import React from 'react'
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/esm/Button';
export default function Cart({ cartItems, handleDelete, handleCheckOut }) {
  const total = cartItems.reduce((acc, obj) => {
    return acc + obj.total
  },0)
  return (
    <div className=' border rounded-md p-4 w-[50%]'>
          <div className=''>
            <Table striped >
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Product</th>
                  <th>Product Photo</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                { cartItems.map((product) => {
                  return (
                    <tr className='' key={product.productId}>
                      <td>{product.companyName}</td>
                      <td>{product.quanity}-{product.nameOfItem}   </td>
                      <td className='grid place-content-center'><Image src={product.photo} className='h-10 place-self-center' /></td>
                      <td>{`$${product.price}`}</td>
                      <td><button className='text-red-500' onClick={()=>handleDelete(product.productId)}>Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
      </div>
      Total: ${total}<br></br>
      <Button onClick={()=> handleCheckOut()}>check out</Button>
      </div>
  )
}
