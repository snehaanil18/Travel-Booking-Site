import React from 'react'

function HomeDestination() {
  return (
    <div>
        <div className="row my-4 py-4">
            <div className="col-6">
                <h3 style={{fontFamily: 'Playfair Display'}} className='text-center pt-4'> "Island of the Gods" , Bali</h3>
                <p className='p-3 fs-6 mx-4 text-justify text-wrap'> Bali offers stunning beaches, lush rice terraces, vibrant culture, and a spiritual atmosphere. Visitors can explore ancient temples, indulge in delicious cuisine, enjoy water sports like surfing and diving, or simply relax in luxurious resorts surrounded by tropical beauty. Bali's unique blend of natural wonders, rich cultural heritage, and warm hospitality makes it a beloved destination for travelers seeking adventure, relaxation, and spiritual rejuvenation.</p>
            </div>
            <div className="col-6 text-center px-3 d-flex">
                <img style={{borderRadius:'25px'}} className='mx-1 border border-dark' src="https://i.pinimg.com/564x/1b/82/bb/1b82bb53765ef7cfd4660821850ff41b.jpg" width={'250px'} height={'300px'} alt="" />
                <img style={{borderRadius:'25px'}} className='mx-1 border border-dark' src="https://img.freepik.com/free-photo/beautiful-penida-island-bali-indonesia_181624-34276.jpg" width={'250px'} height={'300px'} alt="" />
            </div>
        </div>
        <div className="row my-4 py-4">
        <div className="col-6 ps-5 d-flex">
                <img style={{borderRadius:'25px'}} className='mx-1 border border-dark' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-XbdiPDmKR2pFV5KK7c8AfJnbkufDUFR9FF7XH-UJw&s" width={'250px'} height={'300px'} alt="" />
                <img style={{borderRadius:'25px'}} className='mx-1 border border-dark' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnwGHE1i6v_tlGY2d-FYolcmRn2McieHuBd4_29l9o2w&s" width={'250px'} height={'300px'} alt="" />
            </div>
            <div className="col-6">
                <h3 style={{fontFamily: 'Playfair Display'}} className='text-center pt-4'>  "City of Light," Paris</h3>
                <p className=' fs-6 me-4 text-justify text-wrap'>  Paris is celebrated for its iconic landmarks such as the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum. Visitors can stroll along the romantic Seine River, wander through charming neighborhoods like Montmartre, and savor delicious French cuisine in quaint cafes. Paris is also renowned for its vibrant arts scene, with world-class theaters, galleries, and fashion boutiques lining the streets. With its timeless beauty, cultural richness, and romantic ambiance, Paris continues to captivate travelers from around the globe.</p>
            </div>
        </div>
    </div>
  )
}

export default HomeDestination