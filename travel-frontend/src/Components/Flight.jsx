import React, { useEffect, useState } from 'react'
import { addFlightAPI } from '../Services/allAPI';

function Flight() {

    const [token, setToken] = useState("")
    const [flightData, setflightData] = useState({
        id:"",
        from: "",
        to: "",
        date: "",
        slots: "",
        price: ""
    })


    const handleAdd = async() =>{

        const {id,from,to,date,slots,price} = flightData
    
        if(!id||!from||!to||!date||!slots||!price){
          alert("please fill details")
        }
        else{
          const reqBody = new FormData()
          reqBody.append("id",id)
          reqBody.append("from",from)
          reqBody.append("to",to)
          reqBody.append("date",date)
          reqBody.append("slots",slots)
          reqBody.append("price",price)
          
          if(token){
            const reqHeader = {
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            //api call
            const result = await addFlightAPI(reqBody,reqHeader)

    
            if(result.status==200){
              alert("Flight added successfully")
            //   setAddProjectResponse(result.data)
            setflightData({
                id:"",
                from: "",
                to: "",
                date: "",
                slots: "",
                price: ""
              })
              
            }
            else{
              alert(result.response.data)
            }
          }
        }
      }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <h3 style={{ fontFamily: "Whisper" }} className='my-3 text-center'>Add Flights</h3>
                    <label htmlFor="">id:</label>
                    <input type="text" onChange={e => setflightData({ ...flightData, id: e.target.value })} placeholder='id' className='form-control ' /> <br />
                    <label htmlFor="">From:</label>
                    <input type="text" onChange={e => setflightData({ ...flightData, from: e.target.value })} placeholder='location' className='form-control ' /> <br />
                    <label htmlFor="">To:</label>
                    <input type="text" onChange={e => setflightData({ ...flightData, to: e.target.value })} placeholder='location' className='form-control' /> <br />
                    <label htmlFor="">Start Date:</label>
                    <input type="text" onChange={e => setflightData({ ...flightData, date: e.target.value })} placeholder='date' className='form-control' /> <br />
                    <label htmlFor="">Available slots:</label>
                    <input type="text" onChange={e => setflightData({ ...flightData, slots: e.target.value })} placeholder='available slots' className='form-control' /> <br />
                    <label htmlFor="">Price:</label>
                    <input type="text" onChange={e => setflightData({ ...flightData, price: e.target.value })} placeholder='price' className='form-control' /> <br />
                    <div className="text-center">
                        <button onClick={handleAdd} style={{ backgroundColor: "#78C2AD" }} className='btn'>ADD</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Flight