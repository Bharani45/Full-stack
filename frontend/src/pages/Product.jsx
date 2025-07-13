import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Related from '../components/Related';
import Title from '../components/title';

function Product() {
  const { productId } = useParams();
  const { products,addtocart} = useContext(ShopContext);
  const [pd, spd] = useState(null);
  const [imagee, simg] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      spd(found);
      simg(found.image[0]);
    }
  }, [productId, products]);

  return pd ? (
    <div className='flex flex-col'>
    <div className="flex flex-col lg:flex-row p-4 gap-8">
      {/* Left: Thumbnails */}
      <div className="flex lg:flex-col lg:w-1/5 gap-4 overflow-x-auto lg:overflow-visible mx-10">
        {pd.image.map((item, index) => (
          <img
            key={index}
            src={item}
            alt="thumbnail"
            className={`w-50 h-50 object-cover rounded border cursor-pointer ${
              imagee === item ? 'border-black' : 'border-gray-300'
            }`}
            onClick={() => simg(item)}
          />
        ))}
      </div>

      {/* Center: Main image */}
      <div className="flex flex-col justify-center items-center w-full lg:w-2/5">
        <img
          src={imagee}
          alt="main"
          className="w-full max-w-md object-contain rounded-lg border shadow"
        />
        <p className='px-2 py-2 font-semibold'>Size</p>
        <div className='flex flex-row mx-2'>
          {pd.sizes.map((item, index) => (
            <p
              key={index}
              onClick={() => setSelectedSize(item)}
              className={`border text-center w-10 h-10 mx-2 rounded cursor-pointer flex items-center justify-center
                        transition duration-200
                        ${selectedSize === item
                          ? 'bg-black text-white border-black'
                          : 'hover:bg-gray-400 hover:text-white hover:border-black'
                        }`}
            >
              {item}
            </p>
          ))}

        </div>
        <hr></hr>
        <div className='w-full max-w-md mt-6'>
          <div className='flex'>
            <button className='border w-1/2 h-10 rounded-l px-4 py-2 hover:bg-gray-200'>Review</button>
            <button className='border w-1/2 h-10 rounded-r px-4 py-2 font-semibold hover:bg-gray-200'>Description</button>
          </div>
          <div className='border border-t-0 p-4 text-sm text-gray-600'>
            This is an e-commerce website with customizable product details and real-time image previews.
          </div>
        </div>

      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col gap-4 lg:w-2/5">
        <h1 className="text-2xl font-semibold">{pd.name}</h1>
        <div className="flex items-center gap-2">
          <img src={assets.star_icon} alt="rating" className="h-5" />
          <span className="text-gray-600">(4.5/5)</span>
        </div>
        <p className="text-lg text-gray-700 font-medium">{pd.description || 'No description available.'}</p>
        <p className="text-xl font-bold text-green-600">${pd.price}</p>
        
        {/* Optional: Add to cart button */}
        <button onClick={()=>addtocart(pd._id,selectedSize)} className='border bg-black text-white w-1/5 h-[40px] active:bg-gray-700 rounded cursor-pointer'>ADD TO CART</button>
        <div className='text-gray-700 sm:w-4/5'>
        <hr className='text-gray-400'></hr>
      <p>100% quality</p>
      <p>7 days exchange</p>
      <p>Custom made</p>

      </div>
      </div> 
    </div>
    <hr className='text-[2px]'></hr>
    <div className='flex justify-center'>
          <Title text1={"Related"} text2={"Products"} />
    </div>
    <div className='flex justify-center' >
              <Related category={pd.category} subcategory={pd.subcategory} />
          </div>
    
    </div>
  ) : (
    <div className="text-center py-10">Loading product...</div>
  );
}

export default Product;
