import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Productitem from './Productitem';
import Title from './title';

function BestSeller() {
    const {products}=useContext(ShopContext);
    const [bp,sbp]=useState([]);
    useEffect(()=>{
        const best=products.filter((item)=>(item.bestseller));
        sbp(best.slice(0,5));
    },[])
  return (

    <div>
        <div>
            <Title text1='BEST' text2='SELLER' />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4 m-10">
        {
            bp.map((item,index)=>{
                    return (<Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />);
            })
        
        }
      </div>
    </div>
  )
}

export default BestSeller
