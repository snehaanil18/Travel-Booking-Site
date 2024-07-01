import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import Destinations from '../Components/Destinations'
import Blogs from '../Components/Blogs'
import { homePackageAPI } from '../Services/allAPI'
import PlaceCard from '../Components/PlaceCard'
import HomeCard from '../Components/HomeCard'
import HomeDestination from '../Components/HomeDestination'

function Home() {

  const [homePackage,setHomePackage] = useState([])

  const getHomePackage = async(req,res) => {
    const result = await homePackageAPI()
    console.log(result);
    if(result.status==200){
        setHomePackage(result.data)
        console.log(homePackage);
    }
    else{
        console.log(result.response.data);
    }
}

useEffect(() => {
  getHomePackage()
},[])

  return (
    <div>
      <Search/>

      <h1 style={{ fontFamily: "Whisper" }} className='mb-2 my-4 text-center'>Popular Destinations</h1>
      <HomeDestination/>
      {/* <div className="d-flex my-4  mx-3">
      {homePackage.length>0?homePackage.map(item => (
      <div className="col"><HomeCard pack= {item}/></div>)):'<h2>null</h2>'}
      </div>
       */}
      <Blogs/>

    </div>
  )
}

export default Home