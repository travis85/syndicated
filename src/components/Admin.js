import React from 'react'
import axios from 'axios'

export default function Admin() {
    const uploadImage = async (e) => {
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
    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div>
        <>
            <form action='/uploadPhoto' method="POST" encType="multipart/form-data">
            <input type='file' id="file" name="file" accept="image/*" onChange={uploadImage}/>
            <button onClick={handleSubmit}>Submit</button>
        </form>
        </>
    </div>
  )
}
