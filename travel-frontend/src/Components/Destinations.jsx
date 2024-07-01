import React from 'react'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,

} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import PlaceCard from './PlaceCard';


function Destinations() {
    return (

        <div >
            <h1 style={{ fontFamily: "Whisper" }} className='mb-3 mt-3 text-center'>Popular Destinations</h1>
            <div className='m-3'>
                <div className="container pb-2 pt-3 px-5">


                     <MDBCarousel showControls showIndicators>
                        
                        <MDBCarouselItem itemId={1}>
                        
                            <img height={'450px'} src='https://imgcld.yatra.com/ytimages/image/upload/t_yt_blog_c_fill_q_auto:good_f_auto_w_800_h_500/v1534158986/AgraFort_1534158959.jpg' className='d-block w-100' alt='...' />
                            <MDBCarouselCaption>
                            <Link to={'location'}>
                                <div className="container" style={{ backgroundColor: 'aliceblue' }}>
                                    <h5 className='fs-3'>Agra</h5>
                                    <p className='text-dark'>Home to the iconic Taj Mahal, Agra boasts rich Mughal architecture and cultural heritage.</p>
                                </div>
                                </Link>
                            </MDBCarouselCaption>
                            
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId={2}>
                            <img height={'450px'} src='https://media.architecturaldigest.in/wp-content/uploads/2016/03/Feature-image-1.jpg' className='d-block w-100' alt='...' />

                            <MDBCarouselCaption>
                                <div className="container" style={{ backgroundColor: 'aliceblue' }}>
                                    <h5 className='fs-3'>Jaipur</h5>
                                    <p className='text-dark'>The Pink City of India, known for its splendid palaces, vibrant bazaars, and rich Rajputana heritage.</p>
                                </div>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId={3}>
                            <img height={'450px'} src='https://cdn1.tripoto.com/media/filter/tst/img/2052077/Image/1650295522_back_water_of_kerala_soul_of_kerala.jpg.webp' className='d-block w-100' alt='...' />
                            <MDBCarouselCaption>
                                <div className="container" style={{ backgroundColor: 'aliceblue' }}>
                                    <h5 className='fs-3'>Kerala</h5>
                                    <p className='text-dark'> Known as 'God's Own Country', Kerala is renowned for its lush greenery, tranquil backwaters, and vibrant cultural heritage.</p>
                                </div>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                    </MDBCarousel> 

                    {/* <div className='my-3 text-center'>
                        <Link to={'/places'}>
                            <button style={{ backgroundColor: "#78C2AD" }} className='btn text-light'>View More</button>
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Destinations