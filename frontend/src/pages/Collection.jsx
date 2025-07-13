import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/title';
import Productitem from '../components/Productitem';
function Collection() {
  const {products,search,showsearch}=useContext(ShopContext);
  const [disp,sdisp]=useState(false);
  const [dsp,sdsp]=useState([]);
  const [dc,sdc]=useState([]);
  const [dsc,sdsc]=useState([]);
  const [st,sst]=useState('normal');

  useEffect(()=>{
    sdsp(products);
  },[]);
  const toggle=(e)=>{
    if(dc.includes(e.target.value)){
      sdc(prev =>prev.filter(item =>item!==e.target.value));
    }else{
      sdc(prev=>[...prev,e.target.value])
    }
  }

  const subtoggle=(e)=>{
    if(dsc.includes(e.target.value)){
      sdsc(prev =>prev.filter(item =>item!==e.target.value));
    }else{
      sdsc(prev=>[...prev,e.target.value])
    }
  }
  const apply=()=>{
    let copy=products.slice();
    if(showsearch && search){
      copy=copy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(dc.length>0){
      copy=copy.filter((item)=>dc.includes(item.category));
    }
    if(dsc.length>0){
      copy=copy.filter((item)=>dsc.includes(item.subCategory));
    }
    if (st === 'low-high') {
      copy.sort((a, b) => a.price - b.price);
  } else if (st === 'high-low') {
      copy.sort((a, b) => b.price - a.price);
  } 
    sdsp(copy);
  }

  useEffect(()=>{
    apply();
  },[dc,dsc,st,search,showsearch]);
  return (
  
    <div className='flex flex-col sm:flex-row gap-3 pt-10 border-t'>
      {/* Left Filter Section */}
      <div className='w-full sm:w-1/4'>
        {/* Filter Header and Toggle for Mobile */}
        <div className='flex flex-row items-center justify-between'>
          <p className='font-bold'>FILTER</p>
          <img
            onClick={() => sdisp(!disp)}
            src={assets.dropdown_icon}
            className='sm:hidden rotate-90 px-3 h-6 cursor-pointer'
            alt='dropdown'
          />
        </div>

        {/* Filter Section for Desktop */}
        <div className='hidden sm:flex flex-col bg-gray-100 my-4 px-4 py-2'>
          <p className='font-semibold'>CATEGORY</p>
          <div className='py-2'>
            <input type='checkbox' onClick={toggle} value='Men' /> Men <br />
            <input type='checkbox' onClick={toggle} value='Women' /> Women <br />
            <input type='checkbox' onClick={toggle} value='Kids' /> Kids <br />
          </div>

          <p className='font-semibold mt-4'>TYPE</p>
          <div className='py-2'>
            <input type='checkbox' onClick={subtoggle} value='Topwear' /> TopWear <br />
            <input type='checkbox' onClick={subtoggle} value='Bottomwear' /> BottomWear <br />
            <input type='checkbox' onClick={subtoggle} value='Winterwear' /> WinterWear <br />
          </div>
        </div>

        {/* Filter Section for Mobile */}
        {disp && (
          <div className='sm:hidden flex flex-col bg-gray-100 my-4 px-4 py-2'>
            <p className='font-semibold'>CATEGORY</p>
            <div className='py-2'>
              <input type='checkbox' onClick={toggle} value='Men' /> Men <br />
              <input type='checkbox' onClick={toggle} value='Women' /> Women <br />
              <input type='checkbox' onClick={toggle} value='Kids' /> Kids <br />
            </div>

            <p className='font-semibold mt-4'>TYPE</p>
            <div className='py-2'>
              <input type='checkbox' onClick={subtoggle} value='Topwear' /> TopWear <br />
              <input type='checkbox' onClick={subtoggle} value='Bottomwear' /> BottomWear <br />
              <input type='checkbox' onClick={subtoggle} value='Winterwear' /> WinterWear <br />
            </div>
          </div>
        )}
      </div>

      {/* Right Product Title or Collection */}
      <div className='w-full sm:w-3/4'>
        <Title text1='Latest' text2='Collections' />
        <div>
      <select onChange={(e)=>sst(e.target.value)} name="sort" defaultValue="">
        <option  value="" disabled>Sort By</option>
        <option  value="low-high">Sort Low-High</option>
        <option  value="high-low">Sort High-Low</option>
        <option  value="normal">Normal</option>
      </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4 m-10">
          {
            dsp.map((item,index)=>{
                    return (<Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />);
            })
          }
        </div>

      </div>



    </div>
    

  )
}

export default Collection
