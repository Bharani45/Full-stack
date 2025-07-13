import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

function Productitem({id,image,name,price}) {
    const {currency}=useContext(ShopContext);
  return (
    <Link className='group' to={`/product/${id}`}>
      <div className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105">
        <img src={image[0]} className=''/>
        <p>{name}</p>
        <p>{currency}{price}</p>
      </div>
    </Link>
  )
}

export default Productitem
