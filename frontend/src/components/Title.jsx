import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex gap-2 mb-3 text-[25px]'>
      <p className='text-gray-500 m-[5px]'>{text1}<span className='text-gray-700'>{' '+text2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title
