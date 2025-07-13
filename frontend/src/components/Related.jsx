import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Productitem from './Productitem';

const Related = ({category,subcategory}) => {
    const {products}=useContext(ShopContext);
    const [related,setr]=useState([]);
    useEffect(()=>{
        let copy=null;
        if(products.length>0){
            copy=products.slice();
            copy=copy.filter((item)=>category===item.category);
            copy=copy.filter((item)=>subcategory===item.subcategory);
        }
        setr(copy.slice(0,5));
        
    },[]);
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {
            related.map((item,index)=>{
                    return (<Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />);

            })
        }
      
    </div>
  )
}

export default Related
