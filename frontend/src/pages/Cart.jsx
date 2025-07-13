import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/title';
import Productitem from '../components/Productitem';
import { assets } from '../assets/assets';
import Carttotal from '../components/Carttotal';

function Cart() {
  const {products,currency,cartitem,updateCartItem,navi}=useContext(ShopContext);
  const [dcart,scart]=useState([]);
  const remove=(id)=>{
    scart(dcart.filter((items)=>items._id!==id));
  }
  useEffect(()=>{
    const temp=[];
    if(products.length>0){
      
      for(const items in cartitem){
        for(const item in cartitem[items]){
          if(cartitem[items][item]>0){
            temp.push({
              _id:items,
              size:item,
              quantity:cartitem[items][item]
            });
          }
        }
      }
    }

    scart(temp);
  },[cartitem]);

  return (
    <div>
      <Title text1={'YOUR'} text2={'CART'}/>
      <div>
{dcart.map((item, index) => {
  const data = products.find((product) => product._id === item._id);


  return (
    <div key={index} className="flex border-[0.05px] flex-row w-full items-center gap-4 mb-4 px-4">
      {/* Product image */}
      <img src={data.image[0]} alt={data.name} className="w-20 h-20 object-cover rounded" />

      {/* Product info */}
      <div className="flex flex-col flex-grow">
        <p className="font-bold">{data.name}</p>
        <p>Size: {item.size}</p>
        <p>{currency}{data.price}</p>
      </div>

      {/* Quantity */}
      <div className="w-[40px] flex justify-center py-1">
        <input
          type="number"
          min="1"
          className="w-[40px] bg-gray-100 rounded text-center"
          value={item.quantity}
          onChange={(e) => {
            const newQty = Number(e.target.value);
            if (newQty >= 1) updateCartItem(item._id, item.size, newQty);
          }}
        />
      </div>

      {/* Bin icon aligned right */}
      <img
        onClick={()=>remove(item._id)}
        src={assets.bin_icon}
        className="cursor-pointer w-[30px] ml-auto"
        alt="bin"
      />
    </div>

  );
})}

      </div>
<div className="flex flex-col items-end gap-4 mt-6">
  <Carttotal />
  <div className='px-10'>
  <button
    onClick={() => navi('/place-order')}
    className=" border rounded bg-black text-white active:bg-gray-700 hover:scale-105 cursor-pointer w-[120px] h-[40px] transition-all"
  >
    
    Place Order
  </button>
  </div>
</div>

    </div>
  )
}

export default Cart
