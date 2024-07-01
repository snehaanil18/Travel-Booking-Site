import React, { useState } from 'react'
import { createContext } from 'react'

export const addPackageResponseContext = createContext()
export const editPackageResponseContext = createContext()

function ContextShare({children}) {
    const [addPackageResponse,setAddPackageResponse] = useState("")
    const [editPackageResponse,setEditPackageResponse] = useState("")
  return (
    <div>
        
        <addPackageResponseContext.Provider value={{addPackageResponse,setAddPackageResponse}} >
            <editPackageResponseContext.Provider value={{editPackageResponse,setEditPackageResponse}}>
            {children}
            </editPackageResponseContext.Provider>
        </addPackageResponseContext.Provider>
    </div>
  )
}

export default ContextShare