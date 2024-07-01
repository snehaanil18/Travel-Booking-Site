import React, { useEffect, useState } from 'react'
import HomeCard from '../Components/HomeCard'
import { allPackagesAPI } from '../Services/allAPI'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Places() {
  const [searchKey, setSearchKey] = useState("") // 1. To hold the search key
  const [allPackages, setAllPackages] = useState([])
  const [admin, setAdmin] = useState("")
  const navigate = useNavigate()

  const getAllPackages = async (req, res) => {
    console.log('sending requet');
    const result = await allPackagesAPI(searchKey)
    console.log(result);
    if (result.status === 200) {
      setAllPackages(result.data)
    }
    else {
      console.log(result.response.data);
    }

  }

  console.log(allPackages);

  useEffect(() => {
    getAllPackages()
  }, [searchKey])
  console.log(searchKey);

  useEffect(() => {
    // console.log("useEffect for token is triggered");
    if (sessionStorage.getItem("admin")) {
      setAdmin(sessionStorage.getItem("admin"))
      // console.log(token);

    }
    else {
      setAdmin("")
    }
  }, [])




  return (
    <div>

<div className='d-flex justify-content-end'>
        {admin ?
          <p className='mt-3'>View Admin Page<Link className='text-dark text-decoration-underline me-3' to={'/admin'} ><button style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn mx-2 text-light'>View</button></Link> </p>
          :
          <p className='mt-3'>Add Packages ? <Link className='text-dark' to={'/adminlogin'} ><button style={{ backgroundColor: " rgb(238, 60, 5)" }} className='btn mx-2 text-light'>Login</button></Link></p>
        }
      </div>


      <h2 style={{ fontFamily: "Whisper" }} className='text-center m-4'>All Destinatins</h2>
      <input type="search" onChange={e => setSearchKey(e.target.value)} placeholder='Search Places' className='form-control mb-2 mx-auto w-50' />
      {/* <div className='text-center'>
        <button style={{backgroundColor:"#78C2AD"}} className='btn'>Search</button>
      </div> */}

      <div className='row m-5'>
        {
          allPackages?.length > 0 ? allPackages.map(item => (
            <div className="col mt-3">

              <HomeCard pack={item} />
            </div>
          )) : 'cannot fetch packages'
        }

      </div>



    </div>
  )
}

export default Places