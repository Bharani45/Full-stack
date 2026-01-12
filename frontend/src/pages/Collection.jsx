import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';

function Collection() {
  const { products, search, showsearch } = useContext(ShopContext);
  const [disp, sdisp] = useState(false);
  const [dsp, sdsp] = useState([]);
  const [dc, sdc] = useState([]);
  const [dsc, sdsc] = useState([]);
  const [st, sst] = useState('normal');

  useEffect(() => {
    sdsp(products);
  }, [products]);

  const toggle = (e) => {
    const val = e.target.value;
    sdc((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const subtoggle = (e) => {
    const val = e.target.value;
    sdsc((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const apply = () => {
    let copy = [...products];
    if (showsearch && search) {
      copy = copy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (dc.length > 0) {
      copy = copy.filter((item) => dc.includes(item.category));
    }
    if (dsc.length > 0) {
      copy = copy.filter((item) => dsc.includes(item.subCategory));
    }
    if (st === 'low-high') {
      copy.sort((a, b) => a.price - b.price);
    } else if (st === 'high-low') {
      copy.sort((a, b) => b.price - a.price);
    }
    sdsp(copy);
  };

  useEffect(() => {
    apply();
  }, [dc, dsc, st, search, showsearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 px-4 sm:px-8 bg-white border-t">

      {/* Filter Sidebar */}
      <div className="w-full sm:w-1/4">
        {/* Header for mobile filter toggle */}
        <div className="flex items-center justify-between sm:justify-start">
          <p className="font-bold text-lg">Filters</p>
          <img
            onClick={() => sdisp(!disp)}
            src={assets.dropdown_icon}
            className="sm:hidden px-3 h-6 cursor-pointer transform transition-transform duration-300"
            style={{ transform: disp ? 'rotate(180deg)' : 'rotate(90deg)' }}
            alt="dropdown"
          />
        </div>

        {/* Filters */}
        <div className={`${disp ? 'block' : 'hidden'} sm:block mt-4 bg-gray-50 px-6 py-4 rounded-xl shadow`}>
          <p className="font-semibold mb-2 text-gray-700">Category</p>
          <div className="space-y-1 text-sm mb-4">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="block">
                <input type="checkbox" onChange={toggle} value={cat} className="mr-2" />
                {cat}
              </label>
            ))}
          </div>

          <p className="font-semibold mb-2 text-gray-700">Type</p>
          <div className="space-y-1 text-sm">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label key={type} className="block">
                <input type="checkbox" onChange={subtoggle} value={type} className="mr-2" />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-full sm:w-3/4">
        <Title text1="Latest" text2="Collections" />

        <div className="my-4">
          <select
            onChange={(e) => sst(e.target.value)}
            defaultValue=""
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="normal">Default</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-100 rounded-xl shadow">
          {dsp.length > 0 ? (
            dsp.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-3"
              >
                <Productitem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
