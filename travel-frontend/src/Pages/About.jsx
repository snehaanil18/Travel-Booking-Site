import React from 'react'

function About() {
  return (
    <div>
        <div className="row m-5 ">
            <div className="col-6 text-justify ms-5 ps-3">
            At <span className='fw-bold'> Travel Buddy,</span> we believe that every journey begins with a spark of curiosity and a thirst for discovery. Whether you're a seasoned globetrotter or a first-time traveler, our website is your ultimate companion in unlocking the world's wonders and creating unforgettable memories.
            <p className='mt-3'> 
           <span className='fw-bold  me-1'>Discover Inspiring Destinations:</span>Embark on a virtual voyage to some of the most captivating destinations on the planet. From the sun-kissed beaches of Bali to the historic streets of Rome, our destination guides provide an immersive experience, offering insider tips, hidden gems, and expert recommendations to help you plan your dream getaway. </p>
           <p className='mt-3'> 
           <span className='fw-bold  me-1'>Plan Your Perfect Itinerary:</span>Crafting the perfect itinerary is an art form, and we're here to help you master it. Dive into our collection of curated travel itineraries, designed to suit every style, budget, and interest. Whether you're seeking adrenaline-pumping adventures, cultural immersions, or romantic escapades, we've got you covered.</p>
            </div>
            <div className="col-5">
                <img width={'300px'} height={'400px'} style={{borderRadius:'25px'}} className='ms-5 border border-dark' src="https://i.pinimg.com/originals/07/42/01/074201f95df9858b7b4f6b25deaad50d.jpg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default About