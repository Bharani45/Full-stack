import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function Productitem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
      <div className="w-full overflow-hidden flex items-center justify-center">
        <img
          src={image?.[0]}
          alt={name}
          className="h-64 w-64 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-4 text-center font-semibold text-lg">{name}</p>
      <p className="text-center text-gray-600">{currency}{price}</p>
    </Link>
  );
}

export default Productitem;
