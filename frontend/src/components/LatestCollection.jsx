import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './title';
import Productitem from './Productitem';

function LatestCollection() {
    const {products}=useContext(ShopContext);
    const [lp,sp]=useState([]);

    useEffect(()=>{
        sp(products.slice(0,10));
    },[products])
  return (

    <div>
        <div className=''>
            <Title text1="Latest" text2="Collection" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4 m-10">
            {
                lp.map((item,index)=>{
                    return (<Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />);
                })
            }
        </div>
    </div>
  )
}

export default LatestCollection
