import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { MdDateRange } from "react-icons/md";
import Row from 'react-bootstrap/Row';
import { IoLocationSharp } from "react-icons/io5";
import { MdGroups3 } from "react-icons/md";
import { allPackagesAPI } from '../Services/allAPI';
import Collapse from 'react-bootstrap/Collapse';
import PlaceCard from '../Components/PlaceCard';
import Swal from 'sweetalert2'

function Search() {
  const [searchKey, setSearchKey] = useState(""); // 1. To hold the search key
  const [allPackages, setAllPackages] = useState([]);
  const [date,SetDate] = useState('')
  const [people,SetPeople] = useState('')
  const [open, setOpen] = useState(false);

  const getAllPackages = async () => {
    console.log('sending request');
    const result = await allPackagesAPI(searchKey);
    console.log(result);
    if (result.status === 200) {
      setAllPackages(result.data);
    } else {
      console.log(result.response.data);
    }
  }



  // useEffect(() => {
  //   if (searchKey !== '') {
  //     getAllPackages();
  //   }
  // }, [searchKey]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
     if (searchKey !== ''&& date !=='' && people !=='' ) {
         getAllPackages();
     // Prevent default form submission behavior
         setOpen(!open);
        }
      else{
        Swal.fire({
          title: 'Warning',
          text: 'Please fill the form',
          icon: 'warning',
          confirmButtonText: 'Back'
      })
      }  
   
  }

  return (
    <div>
      <div className="container shadow align-items-center my-3 border p-4">
        <h1 style={{ fontFamily: "Whisper" }} className='mb-3 mt-3 '>Search Tour Packages</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-between">
            <Col sm={4} className="my-1 d-flex">
              <label className='me-2 fs-3' htmlFor=""><IoLocationSharp /></label>
              <input onChange={e => setSearchKey(e.target.value)} type="text" className='form-control' placeholder='Destination' />
            </Col>
            <Col sm={3} className="my-1 d-flex">
              <label className='me-2 fs-3' htmlFor=""><MdDateRange /></label>
              <input onChange={e => SetDate(e.target.value)} type="date" className='form-control' />
            </Col>
            <Col xs="auto" className="my-1 d-flex">
              <label className='me-2 fs-3' htmlFor=""><MdGroups3 /></label>
              <input onChange={e => SetPeople(e.target.value)}  type="text" className='form-control' placeholder='Max People' />
            </Col>
            <Col xs="auto" className="my-1">
              <button type="submit" className='btn text-light' style={{ backgroundColor: "rgb(238, 60, 5)" }}>Submit</button>
            </Col>
          </Row>
          <Collapse in={open}>
            <div className='row' id="example-collapse-text">
              {
                allPackages?.length > 0 ? allPackages.map(item => (
                  <div className="col px-5 mt-3" key={item.id}>
                    <PlaceCard pack={item} />
                  </div>
                )) : <div className='text-danger fw-bold'>No packages available for the choosen destination</div>
              }
            </div>
          </Collapse>
        </Form>
      </div>
    </div>
  )
}

export default Search;
