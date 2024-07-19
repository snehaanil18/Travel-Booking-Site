import React, { useContext, useEffect, useState } from 'react'
import { addPackageAPI, deletePackageAPI, getBookingAPI, userPackagesAPI } from '../Services/allAPI';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import EditPackage from './EditPackage';
import { addPackageResponseContext, editPackageResponseContext } from '../ContextAPI/ContextShare';
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';


function Admin() {
  const [fillActive, setFillActive] = useState('tab1');
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  const [allAdminPackages, setAllAdminPackages] = useState([])
  const { addPackageResponse, setAddPackageResponse } = useContext(addPackageResponseContext)
  const { editPackageResponse, setEditPackageResponse } = useContext(editPackageResponseContext)
  const [packageData, setPackageData] = useState({
    name: " ",
    location: "",
    from: "",
    date: "",
    description: "",
    details: "",
    slots: "",
    price: "",
    travelImage: ""
  })

  const [bookingData, setBookingData] = useState([])

  const [fileStatus, setFileStatus] = useState(false)
  const [preview, setPreview] = useState('')


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  const getAdminPackages = async () => {

    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userPackagesAPI(reqHeader)

        setAllAdminPackages(result.data)
      } catch (error) {
        console.error("Error fetching admin packages:", error);
      }
    }
  }

  useEffect(() => {
    getAdminPackages(); // Call the function inside useEffect
  }, [token, addPackageResponse, editPackageResponse])

  useEffect(() => {

    if (packageData.travelImage.type == "image/png" || packageData.travelImage.type == "image/jpeg" || packageData.travelImage.type == "image/jpg") {

      setPreview(URL.createObjectURL(packageData.travelImage))
      setFileStatus(false)
    }
    else {

      setFileStatus(true)
    }
  }, [packageData.travelImage])

  const [username, setUsername] = useState('')


  useEffect(() => {
    if (sessionStorage.getItem('username')) {
      setUsername(sessionStorage.getItem('username'))

    }
    else {
      setUsername('')
    }
  }, [])

  const handleAdd = async () => {

    const { name, location, from, date, description, details, slots, price, travelImage } = packageData

    if (!name || !location || !from || !date || !description || !details || !slots || !price || !travelImage) {
      Swal.fire({
        title: 'Warning',
        text: 'Pleae Fill the Details',
        icon: 'warning',
        confirmButtonText: 'Back'
      })
    }
    else {
      const reqBody = new FormData()
      reqBody.append("name", name)
      reqBody.append("location", location)
      reqBody.append("from", from)
      reqBody.append("date", date)
      reqBody.append("description", description)
      reqBody.append("details", details)
      reqBody.append("slots", slots)
      reqBody.append("price", price)
      reqBody.append("travelImage", travelImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        //api call
        const result = await addPackageAPI(reqBody, reqHeader)
        if (result.status == 200) {
          setAddPackageResponse(result.data)
          Swal.fire({
            title: 'Success',
            text: 'Package added successfully',
            icon: 'success',
            confirmButtonText: 'Back'
          })
          // alert("Package added successfully")
          //   setAddProjectResponse(result.data)
          setPackageData({
            name: " ",
            location: " ",
            from: " ",
            date: " ",
            description: " ",
            details: " ",
            slots: " ",
            price: " ",
            travelImage: " "
          })
          setPreview('')
          navigate('/places')
        }
        else {
          Swal.fire({
            title: 'Error',
            text: result.response.data,
            icon: 'error',
            confirmButtonText: 'Back'
          })
          // alert(result.response.data)
        }
      }
      else {
        Swal.fire({
          title: 'Warning',
          text: 'Pleae login to continue',
          icon: 'warning',
          confirmButtonText: 'Back'
        })
        navigate('/adminlogin')
      }
    }
  }

  useEffect(() => {

    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    else {
      setToken("")
    }
  }, [token])

  const showBookings = async (_id) => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
      const result = await getBookingAPI(_id, reqHeader)
      setBookingData(result.data)
      handleShow()
    }
  }

  const handleDelete = async (_id) => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
      const result = await deletePackageAPI(_id, reqHeader)

      Swal.fire({
        title: 'Success',
        text: 'Package deleted Successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      getAdminPackages()
    }
  }

  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }


  return (
    <div>
      <h2 style={{ fontFamily: "Whisper" }} className='text-center my-2 fw-bold'>Welcome {username}</h2>
      <div className='d-flex justify-content-end'>
        <button onClick={logout} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn mx-2 text-light'>Logout</button>
      </div>

      <div className="container border p-4 my-4">

        <MDBTabs fill className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
              Add Packages
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
              View Packages
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane open={fillActive === 'tab1'}>
            <div className="row">
              <h3 style={{ fontFamily: "Whisper" }} className='my-3 text-center'>Add Trip Packages</h3>

              <div className="col">
                <label htmlFor="">Name of Agency:</label>
                <input type="text" onChange={e => setPackageData({ ...packageData, name: e.target.value })} placeholder='Name of agency' className='form-control' /> <br />

                <label htmlFor="">Destination:</label>
                <input type="text" onChange={e => setPackageData({ ...packageData, location: e.target.value })} placeholder='location' className='form-control' /> <br />

                <label htmlFor="">From:</label>
                <input type="text" onChange={e => setPackageData({ ...packageData, from: e.target.value })} placeholder='location' className='form-control' /> <br />

                <label htmlFor="">Start Date:</label>
                <input type="text" onChange={e => setPackageData({ ...packageData, date: e.target.value })} placeholder='date' className='form-control' /> <br />

                <label htmlFor="">Description:</label>
                <input type="text" onChange={e => setPackageData({ ...packageData, description: e.target.value })} placeholder='description' className='form-control ' /> <br />

                <label htmlFor="">Details:</label> <br />
                <textarea rows={'6'} placeholder='give details of trip' onChange={e => setPackageData({ ...packageData, details: e.target.value })} className='form-control my-1' name="" id=""></textarea>

                <label className='mt-3' htmlFor="">Available slots:</label>
                <input type="text" onChange={e => setPackageData({ ...packageData, slots: e.target.value })} placeholder='available slots' className='form-control mt-1' /> <br />

                <label htmlFor="">Price:</label>
                <input type="text" onChange={e => setPackageData({ ...packageData, price: e.target.value })} placeholder='price' className='form-control' /> <br />

                <label>
                  <p>Attach image of Destination: </p>
                  <input type="file" onChange={e => setPackageData({ ...packageData, travelImage: e.target.files[0] })} style={{ display: 'none' }} />
                  <img width={'300p'} src={preview ? preview : "https://ghumotrip.com/images/round-trip.webp"} alt="" />
                  {fileStatus && <p className='text-danger mt-2'>* Please upload png/jpg/jpeg format images</p>}
                </label>

                <div className="text-center">
                  <button onClick={handleAdd} style={{ backgroundColor: "rgb(238, 60, 5)" }} className='btn text-light'>ADD</button>
                </div>
              </div>
            </div>
          </MDBTabsPane>
          <MDBTabsPane open={fillActive === 'tab2'}>
            <div className="row my-3">



              <div className="col m-3 d-flex flex-wrap">
                {allAdminPackages?.length > 0 ? allAdminPackages.map(pack => (

                  <MDBCard className='m-3' style={{ width: '300px' }}>

                    <MDBCardBody>
                      <MDBCardTitle>{pack.location}</MDBCardTitle>
                      <MDBCardText>
                        Date : {pack.date} <br />
                        From : {pack.from} <br />
                        Price : {pack.price} <br />
                      </MDBCardText>
                      <div className="d-flex">
                        <EditPackage item={pack} />
                        <button onClick={() => showBookings(pack._id)} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn mx-2 text-light'><CiViewList className='fs-4' /></button>
                        <button onClick={() => handleDelete(pack._id)} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn mx-2 text-light'><MdDelete className='fs-4' /></button>
                      </div>

                    </MDBCardBody>
                  </MDBCard>
                )) : <p className='text-danger fw-bold fs-5'>no added  packages</p>}

              </div>
            </div>
          </MDBTabsPane>
        </MDBTabsContent>


        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size='xl'
        >
          <Modal.Header closeButton>
            <Modal.Title>Booking List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex flex-wrap'>
          {
            bookingData?.length>0?bookingData.map((item) => (
            <Card style={{ width: '13rem' }} className='m-2 border'>
              <Card.Img variant="top" src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=ais_user" />
              <Card.Body>
                <Card.Text>
                    Name:{item.name} <br />
                    People:{item.people}
                </Card.Text>
              </Card.Body>
            </Card>
          )):"no data"}
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    </div>
  )
}

export default Admin
