import Modal from 'react-bootstrap/Modal';
import React from 'react'

export default function ErrorModal({errors, showModal}) {

    return (
        <div>
            <Modal
                show={showModal}
                backdrop="static"
                keyboard={false}
                >
                
                <Modal.Header >
                    <Modal.Title>The following is required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {errors.flat(1).map((error,index) => {
                            return (
                                <li key={index} className='text-red-500'>
                                    {error}
                                </li> 
                            )
                        })}
                    </ul>
                </Modal.Body>
                
            </Modal>
        </div>
    )
}
