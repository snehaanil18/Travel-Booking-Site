import React from 'react';


function Blogs() {
  return (
    <div>
      <h1 style={{ fontFamily: "Whisper" }} className='mb-2 text-center'>Customer's Gallery</h1>

      <div className=" mx-4 p-2 my-3 d-flex justify-content-evenly">


        <img className='border border-dark' src="https://thesouthfirst.com/wp-content/uploads/2023/03/kerala-tourism.jpg" height={'200px'} width={'295px'} alt="" />

        <img className='border border-dark' src="https://static.independent.co.uk/2023/10/05/14/iStock-1392554386.jpg" width={'300px'} height={'200px'} alt="" />



        <img className='border border-dark' src="https://s3.india.com/travel/wp-content/uploads/2014/09/Mumbai-Gateway-625x470.jpg" height={'200px'} width={'293px'} alt="" />



        <img className='border border-dark' src="https://img.etimg.com/thumb/msid-66129697,width-640,height-480,imgsize-342241,resizemode-4/how-to-get-your-trips-sponsored.jpg" height={'200px'} width={'300px'} alt="" />


      </div>



      <div className=" mx-4 p-2 my-3 d-flex justify-content-evenly">
        <img className='border shadow border-dark' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdE1sPmmAOQYg5vWqnx7oGbKBDMYQRXpnWyL22hCJYRA&s" height={'200px'} width={'300px'} alt="" />
        <img className='border shadow border-dark' src="https://png.pngtree.com/thumb_back/fh260/background/20220911/pngtree-chittorgarh-india-fort-exteriors-travel-photo-image_9302626.jpg" height={'200px'} width={'300px'} alt="" />
        <img className='border shadow border-dark' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvXVLg6MS322O7Wd_727XpOUEh2V0z20-2oqj2caj0A&s" height={'200px'} width={'300px'} alt="" />
        <img className='border shadow border-dark' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd1uaCmBosdTwWaCor38aw1c8abyjUQYhfSP_m_dGzYg&s" height={'200px'} width={'300px'} alt="" />

      </div>
    </div>
  );
}

export default Blogs;
