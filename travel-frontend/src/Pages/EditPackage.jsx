import React, { useEffect, useState } from 'react'
import { MdOutlineEditNote } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { serverURL } from '../Services/serverURL';
import { updatePackageAPI } from '../Services/allAPI';
import { editPackageResponseContext } from '../ContextAPI/ContextShare';
import { useContext } from 'react';
import Swal from 'sweetalert2'


function EditPackage({item}) {
   
    const {editPackageResponse, setEditPackageResponse} = useContext(editPackageResponseContext )
    const [show, setShow] = useState(false);
    const [fileStatus, setFileStatus] = useState(false)
    const [preview, setPreview] = useState('')
    const navigate = useNavigate()
    const [packageData, setPackageData] = useState({
        id: item._id ,
        name: item.name ,
        location: item.location,
        from: item.from,
        date: item.date ,
        description: item.description,
        details: item.details,
        slots: item.slots,
        price: item.price,
        travelImage: ''
    });
    const handleClose = () => {
        setShow(false);
        setPackageData({
            id: item._id ,
            name: item.name ,
            location: item.location,
            from: item.from,
            date: item.date ,
            description: item.description,
            details: item.details,
            slots: item.slots,
            price: item.price,
            travelImage: ''
        })
        setPreview("")
    }
    const handleShow = () => setShow(true);



    const updatePackage = async() => {
        const { id,name, location, from, date, description, details, slots, price } = packageData
        const reqBody = new FormData()
        reqBody.append("name", name)
        reqBody.append("location", location)
        reqBody.append("from", from)
        reqBody.append("date", date)
        reqBody.append("description", description)
        reqBody.append("details", details)
        reqBody.append("slots", slots)
        reqBody.append("price", price)
 
    
        const token = sessionStorage.getItem("token");
  
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
    
          //api call
          const result = await updatePackageAPI(id,reqBody,reqHeader)
          
          if(result.status===200){
            Swal.fire({
                title: 'Success',
                text: 'Package updated',
                icon: 'success',
                confirmButtonText: 'OK'
              })
            handleClose()
            setEditPackageResponse(result.data)
          }
          else{
            Swal.fire({
                title: 'Error',
                text: 'Package not updated',
                icon: 'error',
                confirmButtonText: 'Back'
              })          
            setEditPackageResponse(result.response.data)
          }
        
      }



    return (
        <div>
            <button onClick={handleShow} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn text-light'><MdOutlineEditNote className='fs-4' /></button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container border p-4 my-4">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Name of Agency:</label>
                                <input type="text" value={packageData.name} onChange={e => setPackageData({ ...packageData, name: e.target.value })} placeholder='Name of agency' className='form-control' /> <br />

                                <label htmlFor="">Destination:</label>
                                <input type="text" value={packageData.location} onChange={e => setPackageData({ ...packageData, location: e.target.value })} placeholder='location' className='form-control' /> <br />

                                <label htmlFor="">From:</label>
                                <input type="text" value={packageData.from} onChange={e => setPackageData({ ...packageData, from: e.target.value })} placeholder='location' className='form-control' /> <br />

                                <label htmlFor="">Start Date:</label>
                                <input type="text" value={packageData.date} onChange={e => setPackageData({ ...packageData, date: e.target.value })} placeholder='date' className='form-control' /> <br />

                                <label htmlFor="">Description:</label>
                                <input type="text" value={packageData.description} onChange={e => setPackageData({ ...packageData, description: e.target.value })} placeholder='description' className='form-control ' /> <br />

                                <label htmlFor="">Details:</label> <br />
                                <textarea rows={'6'} value={packageData.details} placeholder='give details of trip' onChange={e => setPackageData({ ...packageData, details: e.target.value })} className='form-control my-1' name="" id=""></textarea>

                                <label className='mt-3' htmlFor="">Available slots:</label>
                                <input type="text" value={packageData.slots} onChange={e => setPackageData({ ...packageData, slots: e.target.value })} placeholder='available slots' className='form-control mt-1' /> <br />

                                <label htmlFor="">Price:</label>
                                <input type="text" value={packageData.price} onChange={e => setPackageData({ ...packageData, price: e.target.value })} placeholder='price' className='form-control' /> <br />



                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button onClick={updatePackage}  style={{ backgroundColor: "rgb(238, 60, 5)" }} className='btn text-light'>UPDATE</button>
                </Modal.Footer>
            </Modal>







        </div>
    )
}

export default EditPackage