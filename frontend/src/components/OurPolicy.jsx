import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
function OurPolicy() {
  return (
    <div className='flex justify-center'>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-50 p-4 m-10 text-center">
        <Link>
        <div className='flex flex-col items-center hover:underline'>
            <img src={assets.exchange_icon} className='' alt='exchange' />
            <p >Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>

        </div>
        </Link>
        <Link>
        <div className='flex flex-col items-center hover:underline'>
            <img src={assets.quality_icon} className='' alt='quality' />
            <p >7 Days Return Policy</p>
            <p className='text-gray-400'>We support 7 days return policy</p>

        </div>
        </Link>
        <Link>      
        <div className='flex flex-col items-center hover:underline'>
            <img src={assets.support_img} className='' alt='support' />
            <p >Best Customer Support</p>
            <p className='text-gray-400'>We provide 24/7 service</p>
        </div>
        </Link>         
      </div>
    </div>
  )
}

export default OurPolicy
