import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Image from 'react-bootstrap/esm/Image';
import AddProductModal from './AddProductModal';
import Table from 'react-bootstrap/Table';
import LoadinFunction from '../utils/LoadinFunction';
import ChangeInfoModal from './ChangeInfoModal';
export default function PartnerProfilePage() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const partnerData = location.state.partnerData

  const [id, setId] = useState(location.state.partnerData.partnerId)
  const [productsDataEntries, setProductsDataEntries] = useState(location.state.partnerData.products)
  
  const addProduct = async (description, productPrice, productPhotoUrl, productPhoto, productName,) => {
      setLoading(true)
      const data = {
        partnerId: location.state.partnerData.partnerId,
        productPhoto: productPhoto,
        productPhotoUrl: productPhotoUrl,
        productPrice: productPrice,
        productName: productName,
        description: description
      }
       axios.post(`http://localhost:8000/addProduct`, data )
      .then( (res) => {
        setProductsDataEntries(res.data.products)
        console.log(res.data, '/Addproducct')
      })
      .then(setLoading(false))
  }
  const fecthPartnerProfile = async () => {
    setLoading(true)
    const partnerId = { id: id }
    await axios.post(`http://localhost:8000/selectedPartner`, partnerId)
      .then(async res => setProductsDataEntries(res.data[0].products) )
      .then(setLoading(false))
    }


    const updateData = async (data) => {
      const id = { partnerId: partnerData.partnerId }
      const udatedData = Object.assign(data, id)
      await axios.post('/updatePartnerProfile', udatedData)
      .then(res => {
        console.log(res.data, 'updateData()')
              
      })
    }

  const deleteProduct = async (product) => {
      setLoading(true)
      const bothIds = {
        product: product,
        partnerId: location.state.partnerData.partnerId
      }
      await axios.post('/deleteProduct', bothIds)
        .then(res => {
        setProductsDataEntries(res.data.products)
        console.log(res.data, 'Product Deleted')
      }).then(setLoading(false))

    }
    const updatePhotoData = async (e) => {
        e.preventDefault()
        const photoRef = partnerData.companyLogo
        let photoId = `${partnerData.companyName} - ${uuidv4()}`
        // setCompanyLogo(photoId)
        let file = e.target.files[0]
        let blob = file.slice(0, file.size, 'image/jpeg')
        let newfile = new File([blob], photoId,{ type: 'image/jpeg' })
        let data = new FormData()
        data.append('file', newfile)
        data.append('photoToDelete', photoRef)
        await axios.post('http://localhost:8000/updatePhoto', data)
        .then(async res => {
          // setCompanyLogoStorageUrl(res.data)
          updateData({
            companyLogoStorageUrl: res.data,
            companyLogo: photoId        
          })
          console.log(res.data, 'photo')
               
        })

    }

  useEffect(() => {
    fecthPartnerProfile()
  }, [productsDataEntries])
  
  return (
    <div className='p-10 grid grid-cols-2'>
      <div>
        <div className='flex'> 
          <Image src={ partnerData.companyLogoStorageUrl} className='h-12'/>
          <h1 className='ml-4'>{partnerData.companyName}</h1>
          <ChangeInfoModal />
        </div>
        <div className=''>
          <p>
            Contact Person: <span className='text-muted ml-2'>{partnerData.contactPerson} </span><br></br>
            Phone Number: <span className='text-muted ml-2'>{partnerData.phoneNumber}</span><br></br>
            Email: <span className='text-muted ml-2'>{partnerData.email}</span><br></br>
            Address: <span className='text-muted ml-2'>{partnerData.address} - {partnerData.city}, {partnerData.state} {partnerData.zipCode}</span><br></br>

          </p>
        </div>
      </div>
      {loading ? <LoadinFunction /> :
        <div className=' border rounded-md p-4'>
          <div className=''>
            <Table striped >
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Photo</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {productsDataEntries === undefined ? 'Please add Product' : productsDataEntries.map((product) => {
                
                  return (
              
                    <tr>
                      <td>{product.productName}</td>
                      <td className='grid place-content-center'><Image src={product.productPhotoUrl} className='h-10 ' /></td>
                      <td>{product.description}</td>
                      <td>{`$${product.productPrice}`}</td>
                      <td><button className='text-red-500' onClick={() => { deleteProduct(product) }} >Delete</button></td>
                    </tr>
              
                  )
                
                })}
        
              </tbody>
            </Table>
          </div>
        
          < AddProductModal partnerId={location.state.partnerData.partnerId} addProduct={addProduct} />
        
        </div>
      }
    </div>
    
  )
}
