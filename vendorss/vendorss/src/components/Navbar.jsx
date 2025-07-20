import React from 'react'
import {assets} from '../assets/assets'
function Navbar({settoken}) {
  return (
    <div className='flex px-[2%] py-[2%] items-center justify-between'>
      <img className='w-[140px]' src={assets.logo}/>
      
        <button onClick={()=>settoken('')} className='border bg-black text-white rounded w-[100px]'>Logout</button>
      
    </div>
  )
}

export default Navbar
