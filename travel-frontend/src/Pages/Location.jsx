import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makePaymentAPI, verifyPaymentAPI, viewDestinationAPI } from '../Services/allAPI';
import { serverURL } from '../Services/serverURL';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import EditPackage from './EditPackage';
import { MdOutlineEditNote } from "react-icons/md";

function Location() {
    const { id } = useParams();
    const [packageData, setPackageData] = useState({});
    const [admin, setAdmin] = useState("")
    const [token, setToken] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        // console.log("useEffect for token is triggered");
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            // console.log(token);

        }
        else {
            setToken("")
        }
    }, [token])

    useEffect(() => {
        // console.log("useEffect for token is triggered");
        if (sessionStorage.getItem("admin")) {

            
          // console.log(token);
    
        }
        else {
          setAdmin("")
        }
      }, [])

    const currency = "INR";
    const receipt = "qwsaq1";

    useEffect(() => {
        const getDestination = async () => {
            try {
                const result = await viewDestinationAPI(id);
                console.log(result.data);

                setPackageData(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        getDestination();
    }, [id]);



    const amount = packageData.price * 100;
    const handlePayment = async () => {
        try {
            const reqBody = { amount, currency, receipt };
            console.log(reqBody);

            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                const response = await makePaymentAPI(reqBody, reqHeader);
                console.log(response.data);

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
                            console.log(validateRes);
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
                        <button onClick={handlePayment} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn text-light'>BOOK</button>
                    </div>
                </div>
                {/* <div className="col-6 container"></div> */}
            </div>
        </div>
    );
}

export default Location;
