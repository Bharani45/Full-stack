import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function Searchbar() {
    const {search,setsearch,showsearch,setshowsearch}=useContext(ShopContext);
    const location=useLocation();
    const [visible,setvisible]=useState(false);

    useEffect(()=>{
        if(location.pathname.includes('/collection')){
            setvisible(true);
        }else{
            setvisible(false);
        }
    },[location,showsearch])
    return showsearch && visible?(
    <div>
      <div className='flex justify-center'>
        <input onChange={(e)=>setsearch(e.target.value)}className='w-1/3 border rounded' type='search' placeholder='search'/>
        <img onClick={()=>setshowsearch(false)} src={assets.cross_icon} className='h-10 w-10 px-2 py-2'/>
      </div>
    </div>
  ):null
}

export default Searchbar
