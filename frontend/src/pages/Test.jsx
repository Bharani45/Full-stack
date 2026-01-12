import React from 'react'
import Title from '../components/Title'

function Test() {
    const ls = ()=>{
         console.log('hi');   
    };
  return (
    <div className='flex flex-col justify-center'>
    <button className='align-center border rounded w-20 px-20  background-black' type='button' onClick={() => ls()}>click</button>
      <p>Hello</p>
      <p>im an god demigod</p>
    </div>
  )
}

export default Test
