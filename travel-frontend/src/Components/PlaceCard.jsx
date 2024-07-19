import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,

} from 'mdb-react-ui-kit';
import { serverURL } from '../Services/serverURL';

import { Link } from 'react-router-dom';




function PlaceCard({ pack }) {



    return (
        <div>
            <div className="">
            <Link to={`location/${pack._id}`}>
                 <MDBCard  style={{ height: '480px' ,width:'22rem' }}>
                        <MDBCardImage height={'250px'} width={'100%'} src={pack?`${serverURL}/uploads/${pack.travelImage}`:'https://www.exoticmiles.com/wp-content/uploads/2023/07/pkg4-768x512.jpg'} position='top' alt='...' />
                        <MDBCardBody>
                            <MDBCardTitle className='text-center'>{pack.location}</MDBCardTitle>
                            <MDBCardText>
                                {pack.description}
                            </MDBCardText>

                        </MDBCardBody>
                    </MDBCard> 
                    </Link>


 
      
            </div>

        </div>
    )
}

export default PlaceCard