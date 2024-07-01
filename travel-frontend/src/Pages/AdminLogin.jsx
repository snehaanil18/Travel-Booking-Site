import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginAdminAPI, registerAdminAPI } from '../Services/allAPI'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AdminLogin({ register }) {
    const [userData, setUserData] = useState({   // to hold user details
        username: "",
        email: "",
        password: "",
        company: ""
    })

    const navigate = useNavigate()

    const handleRegister = async(e) => {
        e.preventDefault()
        if(!userData.username||!userData.company||!userData.email||!userData.password){
          Swal.fire({
            title: 'Warning',
            text: 'Please fill the form',
            icon: 'warning',
            confirmButtonText: 'Back'
          })
        }
        else{
          const result = await registerAdminAPI(userData)
          console.log(result);
          if(result.status===200){
            Swal.fire({
              title: 'Success',
              text: 'Successfully registered',
              icon: 'success',
              confirmButtonText: 'Back'
            })
            setUserData({
              username:"",
              email:"",
              password:""
            })
            navigate('/adminlogin')
          }
          else if(result.response.status===406){
            Swal.fire({
              title: 'Error',
              text: result.response.data,
              icon: 'error',
              confirmButtonText: 'Back'
            })
      
          }
        }
        console.log(userData);
      }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!userData.email || !userData.password) {
            Swal.fire({
                title: 'Warning',
                text: 'Please fill the form',
                icon: 'warning',
                confirmButtonText: 'Back'
            })
        }
        else {
            const result = await loginAdminAPI(userData)
            console.log(result);
            if (result.status === 200) {
                console.log(result);
                sessionStorage.setItem("username", result.data.existingAdmin.username)
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("admin", result.data.existingAdmin._id)

                Swal.fire({
                    title: 'Success',
                    text: 'Login Successfull',
                    icon: 'success',
                    confirmButtonText: 'Back'
                })
                setUserData({
                    email: "",
                    password: ""
                })
                navigate('/admin')
            }
            else if (result.response.status === 404) {
                Swal.fire({
                    title: 'Error',
                    text: result.response.data,
                    icon: 'error',
                    confirmButtonText: 'Back'
                })

            }
        }
        console.log(userData);
    }

    return (
        <div>
            <div className="row">
                <h3 style={{ fontFamily: "Whisper" }} className='text-center'>Admin</h3>
                {/* <div className="p-5 col-lg-6">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/007/660/717/small_2x/world-travel-top-view-of-global-map-and-baggage-for-vacation-concept-of-vacation-with-location-symbol-passport-ticket-airplane-luggage-maps-camera-sandal-hat-and-compass-flat-design-free-vector.jpg" height={'440px'} width={'100%'} alt="" /> 
        </div> */}
                <div className="text-center">
                    <div className="px-5 pb-5 container">
                        <form style={{ height: '490px' }} className='pb-3 shadow text-dark bg-light mb-3'>
                            <h2 style={{ fontFamily: "Whisper" }} className='text-center p-3  mt-5'>Travel Buddy</h2>
                            <h4 style={{ fontFamily: "Whisper" }} className='text-center'>
                                {
                                    register ? 'Register Here' : 'Login Here'
                                }
                            </h4>
                            <div className='mx-5 px-5 mt-5 pb-4'>
                                {
                                    register &&
                                    <div>
                             
                                        <input type="text"
                                            placeholder='username' onChange={e => setUserData({ ...userData, username: e.target.value })} value={userData.username} className='form-control mt-3' />
                                        
                                        <input type="text"
                                            placeholder='Company Name' onChange={e => setUserData({ ...userData, company: e.target.value })} value={userData.company} className='form-control mt-3' />
                                    </div>

                                }
                                <input type="text"
                                    placeholder='email' onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} className='form-control mt-3' />

                                <input type="password" onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} placeholder='password' className='form-control mt-3' />
                            </div>
                            {
                                register ?
                                    <div className="text-center pb-4">
                                        <button onClick={handleRegister} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='m-3 text-light btn'>Register</button>
                                        <p className='mb-3'>Already Registered? <Link className='text-dark' to={'/adminlogin'}>Login here...</Link></p>
                                    </div>
                                    :
                                    <div className="text-center">
                                        <button onClick={handleLogin} style={{ backgroundColor: " rgb(238, 60, 5)" }} className='m-3 text-light btn'>Login</button>
                                        <p className='mt-3'>New to here? <Link className='text-dark' to={'/adminregister'} >Register here...</Link></p>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin