import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/title'
import News from '../components/News'
import { Link } from 'react-router-dom'
function Contact() {
  return (
    <div>
      <div className='flex flex-col  justify-center items-center m-10'>
        <Title text1={'CONTACT'} text2={'US'}/><br/>
        <div className='flex flex-row'>
          <img className='w-[400px]' src={assets.contact_img} />
          <div className='m-5'>
            <p className='font-bold'>Our Store</p>
            <p className='text-gray-500'>1/307 Amaravathi palayam <br/>
            Muthur Tiruppur <br/>
            Tel 123-456-789 <br/>
            Email dubaikurukusandhu@gmail.com</p>
            <p><br/></p>
            <p className='font-bold'>Careers at forever</p>
            <p className='text-gray-500'>Learn more about our terms and openings</p><br/>
            <Link to='/vendor-register'><button className='w-[110px] py-2 border bg-black text-white rounded hover:bg-gray-300 cursor-pointer'>Explore jobs</button></Link>
          </div>
          

        </div><br/>
        <div>
          <News/>
        </div>

      </div>
    </div>
  )
}

export default Contact