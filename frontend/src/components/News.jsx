import React from 'react'

function News() {
  return (
    <div>
      <div className='flex justify-center'>
        <p>Subcribe for 20% off</p>

      </div>
      <div className='flex justify-center m-2 '>
        <form className=''>
            <input className='bg-gray-300 h-[50px]' type='email' placeholder='Enter' required />
        </form>
        <button className='bg-red-500 px-2 py-2 rounded hover:underline cursor-pointer'>SUBSCRIBE</button>
        
      </div>

    </div>
  )
}

export default News
