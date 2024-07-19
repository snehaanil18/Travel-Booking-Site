import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addBookingAPI, makePaymentAPI, verifyPaymentAPI, viewDestinationAPI } from '../Services/allAPI';
import { serverURL } from '../Services/serverURL';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Location() {
    const { id } = useParams();
    const [packageData, setPackageData] = useState({});
    const [admin, setAdmin] = useState("")
    const [token, setToken] = useState("")
    const navigate = useNavigate()

    const [bookingData, setBookingData] = useState({
        name: "",
        people: ""
    })

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [token])


    const currency = "INR";
    const receipt = "qwsaq1";

    useEffect(() => {
        const getDestination = async () => {
            try {
                const result = await viewDestinationAPI(id);


                setPackageData(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        getDestination();
    }, [id]);


    const handleBooking = () => {
        handleClose()
        const pay = bookingData.people * packageData.price
        Swal.fire({
            title: 'Info',
            html: `
            Total Price:<b> ${pay}</b>`,
            showCancelButton: true,
            cancelButtonText: 'Back',
            icon: 'info',
            confirmButtonText: 'Book',
            preConfirm: () => {
                handlePayment();
            }
        })
    }



    const amount = bookingData.people * packageData.price * 100;
    const handlePayment = async () => {
        try {
            if (amount > 10000000) {
                Swal.fire({
                    title: 'Error',
                    html: `
                    <div>
                        <p>Total Amount exceeds Daily Payment limit.</p>
                        <p>Please contact support for assistance.</p>
                    </div>
                `,
                    icon: 'error',
                    confirmButtonText: 'Back'
                })
            }
            else {
                const reqBody = { amount, currency, receipt };


                if (token) {
                    const reqHeader = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }

                    const response = await makePaymentAPI(reqBody, reqHeader);


                    const options = {
                        key: "rzp_test_EViR7jyHOvxPD3",
                        amount,
                        currency,
                        payment_capture: 1,
                        name: "Travel Buddy",
                        description: "Test Transaction",
                        image: "https://img.freepik.com/premium-photo/travel-concept-with-landmarks_23-2149153251.jpg",
                        order_id: response.data.id,
                        handler: async function (response) {
                            try {
                                const validateRes = await verifyPaymentAPI(response);
                                const packageId = packageData._id; // Replace with actual package ID
                                const reqBody = { name: bookingData.name, people: bookingData.people };
                                const reqHeader = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
                                const confirmBook = await addBookingAPI(packageId, reqBody, reqHeader);
                                console.log(confirmBook);
                                // Handle the payment verification response
                            } catch (error) {
                                console.log(error);
                                // Handle the payment verification error
                            }
                        },
                        method: {
                            // Specify UPI as the payment method
                            upi: true,
                        },
                        notes: {
                            address: "Razorpay Corporate Office",
                            order_id: response.data.id,
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();

                }
                else {
                    Swal.fire({
                        title: 'Warning',
                        text: 'Pleae login to continue',
                        icon: 'warning',
                        confirmButtonText: 'Back'
                    })
                    navigate('/login')
                }
            }
        } catch (error) {
            console.log(error);
            // Handle the payment error scenario

        }
    };


    let inputText = packageData.details || "";
    let formattedText = inputText.replace(/\n/g, '<br>');

    const logout = () => {
        sessionStorage.clear()
        navigate('/')
    }



    return (
        <div>
            {token &&
                <div className='d-flex justify-content-end'>
                    <button onClick={logout} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn m-3 text-light'>Logout</button>
                </div>
            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Book Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" onChange={e => setBookingData({ ...bookingData, name: e.target.value })} placeholder='Full Name' className='form-control' />
                    <input type="text" onChange={e => setBookingData({ ...bookingData, people: e.target.value })} placeholder='Number of People' className='form-control mt-3' />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button onClick={handleBooking} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn text-light'>BOOK</button>
                </Modal.Footer>
            </Modal>


            <div className='p-5 mx-5'>
                <img src={packageData ? `${serverURL}/uploads/${packageData.travelImage}` : 'https://www.exoticmiles.com/wp-content/uploads/2023/07/pkg4-768x512.jpg'} width={'100%'} height={'400px'} alt="" />
                <h3 style={{ fontFamily: 'Oswald' }} className='py-3  text-center'>{packageData.location}</h3>
                <p style={{ fontSize: '18px' }} className=''> <span className='fw-bold text-center text-danger '>{packageData.description} </span> </p>
            </div>
            <div className="row mb-4">
                <div className="col-11 container mx-5 border border-dark py-4">


                    <div className='px-5 pt-4'>
                        <p style={{ fontSize: '18px' }} className=''>Name of Agency : <span className='fw-bold  '>{packageData.name} </span> </p>
                        <p style={{ fontSize: '18px' }} className=''>Starting From : <span className='fw-bold  '>{packageData.from} </span> </p>
                        <p style={{ fontSize: '18px' }} className=''>Date : <span className='fw-bold  '>{packageData.date} </span> </p>
                        <p style={{ fontSize: '18px' }} className=''>Details :
                            <span className='' dangerouslySetInnerHTML={{ __html: formattedText }}></span>
                        </p>
                        <p style={{ fontSize: '18px' }} className=''>Price : <span className='fw-bold text-danger '>{packageData.price} </span> </p>
                        <button onClick={handleShow} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn text-light'>Book</button>

                    </div>
                </div>
                {/* <div className="col-6 container"></div> */}
            </div>
        </div>
    );
}

export default Location;
