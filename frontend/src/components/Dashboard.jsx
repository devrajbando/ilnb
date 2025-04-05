
import React from 'react'
import { useState } from 'react'
function Dashboard() {
    const [selected,setSelected] = useState("Equities")
  return (
    <>
    <div className='flex'>
        <div className='basis-1/4 p-5'>

            <ul className="menu bg-base-200 rounded-box w-56">
                <li>
                    <button className={`btn btn-xs sm:btn-sm md:btn-md btn-soft ${selected === "Equities" ? "btn-success" : "btn"}`} onClick={() => setSelected("Equities")}>
                    Equities
                    </button>
                </li>
                <li>
                    <button className={`btn btn-xs sm:btn-sm md:btn-md btn-soft ${selected === "Mutual Funds" ? "btn-success" : "btn"}`} onClick={() => setSelected("Mutual Funds")}>
                    
                    Mutual Funds
                    </button>
                 </li>
        
            </ul>
        </div>
        <div className='basis-3/4 p-5'>
            <h1 className='text-2xl font-bold'>Showing All Your {selected}</h1>
        </div>
    </div>
    </>
  )
}

export default Dashboard