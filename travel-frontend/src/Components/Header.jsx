import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MdOutlineTravelExplore } from "react-icons/md";

function Header() {

    const [admin, setAdmin] = useState("")

    useEffect(() => {

        if (sessionStorage.getItem("admin")) {
          setAdmin(sessionStorage.getItem("admin"))

    
        }
        else {
          setAdmin("")
        }
      }, [])

    return (
        <div>

            <Navbar style={{ backgroundColor:  ' rgb(238, 60, 5)' }}  data-bs-theme="light">
                <Container>
                    <Navbar.Brand className='text-light' href="#home"><MdOutlineTravelExplore />  Travel Buddy</Navbar.Brand>
                    <Nav className="mx-auto">
                        <Link to={'/'} className="text-light me-3 fs-6 nav-link">
                            Home
                        </Link>
                        <Link to={'places'} className="text-light mx-3 fs-6 nav-link">
                            Packages
                        </Link>
                        <Link to={'about'} className="text-light mx-3 fs-6 nav-link">
                            About
                        </Link>

          
                    </Nav>
                </Container>
            </Navbar>

















            {/* <MDBNavbar light style={{ backgroundColor: "#78C2AD" }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>
                        <img
                            src='https://marketplace.canva.com/EAFvvrEdW20/1/0/1600w/canva-blue-and-yellow-illustrative-travel-agency-logo-TWAjs1N3SXo.jpg'
                            height='30'
                            alt=''
                            loading='lazy'
                        />
                        Travel Buddy
                        <div className="d-flex ms-5 ps-5  justify-content-center">
                            <Link to={'/'} className="ms-5 ps-5 fs-5 nav-link">
                                Home
                            </Link>
                            <Link to={'places'} className="ms-5 ps-5 fs-5 nav-link">
                                Packages
                            </Link>
                            <Link to={'places'} className="ms-5 ps-5 fs-5 nav-link">
                                About 
                            </Link>
                            </div>
                        {isLoggedIn ?
                            <div className="position-absolute bottom-0 end-0">
                                <button className='btn btn-light m-3'>LogOut</button>
                            </div>
                            :
                            <div className="position-absolute bottom-0 end-0">
                                <Link to={'login'}>
                                    <button className='btn btn-light m-3'>Login/Sign Up</button>
                                </Link>
                            </div>}


                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar> */}
        </div>
    )
}

export default Header