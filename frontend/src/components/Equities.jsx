import React from 'react'
import SearchBar from './SearchBar'
import { Binoculars ,GitCompareArrows} from 'lucide-react'
function Equities() {
  return (
    <>
    <div className='flex justify-center'>
        <SearchBar/>
    </div>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          
        </th>
        <th>Company</th>
        <th>Market Price</th>
        <th>Close Price</th>
        <th>Market Cap(CR)</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>
          
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Rs.1000</td>
        <td>
           Rs.1000
        </td>
        <th>
          <button className="btn btn-ghost btn-md text-green-600">View <Binoculars/></button>
        </th>
        <th>
          <button className="btn btn-ghost btn-md">Compare <GitCompareArrows/></button>
        </th>
      </tr>
     
    </tbody>
   
  </table>
</div>
    </>
  )
}

export default Equities
