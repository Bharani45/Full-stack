import React, { useContext, useState } from 'react';
import Title from '../components/title';
import Carttotal from '../components/Carttotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
function Placeorder() {
  const { navi,backendurl,token,setcart,cartitem,getcartamt,delivery,products } = useContext(ShopContext);
  const [meth, setmeth] = useState('cod');
  const [formdata, setform] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onchangehandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setform(prev => ({ ...prev, [name]: value }));
  };

  
const handlePlaceOrder = async (e) => {
  e.preventDefault();

  // Validate required form fields
  for (const key in formdata) {
    if (!formdata[key]) {
      toast.error(`${key} is required`);
      return;
    }
  }

  try {
let items = {};

for (const productId in cartitem) {
  for (const size in cartitem[productId]) {
    const quantity = cartitem[productId][size];
    if (quantity > 0) {
      const product = products.find(p => p._id === productId);
      if (product) {
        const key = `${productId}_${size}`; // Unique per product-size
        items[key] = {
          name: product.name,
          image: product.image?.[0],
          price: product.price,
          quantity,
          size,
          vendorEmail: product.vendorEmail,
          status: "Placed"
        };
      }
    }
  }
}

console.log(items);

const orderdata = {
  address: formdata,
  items,
  amount: getcartamt() + delivery, // ✅ match schema
  paymentmethod: meth              // ✅ match schema: 'COD'
};


    let response;

    if (meth === 'cod') {
      response = await axios.post(
        `${backendurl}/api/order/place`,
        orderdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
else if (meth === 'stripe') {
  // ✅ Save data before redirect
  localStorage.setItem("stripe_amount", getcartamt()+delivery);
  localStorage.setItem("stripe_address", JSON.stringify(formdata));

  const responsestripe = await axios.post(
    backendurl + '/api/order/stripe',
    orderdata,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (responsestripe.data.success) {
    const { session_url } = responsestripe.data;
    window.location.replace(session_url); // ✅ Now redirect
  } else {
    toast.error(responsestripe.data.message);
  }
}

    else if (meth === 'razor') {
      toast.info("Razorpay payment is not implemented yet.");
      return;
    }

    if (response?.data?.success) {
      toast.success("Order placed successfully!");
      setcart({});
      navi("/orders");
    } else {
      toast.error(response?.data?.message || "Failed to place order.");
    }

  } catch (error) {
    console.error("Order error:", error);
    toast.error("Server error while placing order.");
  }
};


  return (
    <form className="flex sm:flex-col sm:justify-start lg:flex-row" onSubmit={handlePlaceOrder}>
      <div className='flex flex-col px-10 m-10'>
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        <div className="flex flex-col gap-4 w-[100%] p-6 border rounded-lg shadow-md bg-white">
          {/* Name row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              name="firstname"
              onChange={onchangehandle}
              value={formdata.firstname}
              type="text"
              placeholder="First Name"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="lastname"
              onChange={onchangehandle}
              value={formdata.lastname}
              type="text"
              placeholder="Last Name"
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <input
            name="email"
            onChange={onchangehandle}
            value={formdata.email}
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded w-full"
          />

          <input
            name="street"
            onChange={onchangehandle}
            value={formdata.street}
            type="text"
            placeholder="Street"
            className="border px-3 py-2 rounded w-full"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              name="state"
              onChange={onchangehandle}
              value={formdata.state}
              type="text"
              placeholder="State"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="city"
              onChange={onchangehandle}
              value={formdata.city}
              type="text"
              placeholder="City"
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              name="zipcode"
              onChange={onchangehandle}
              value={formdata.zipcode}
              type="text"
              placeholder="Zipcode"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="country"
              onChange={onchangehandle}
              value={formdata.country}
              type="text"
              placeholder="Country"
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <input
            name="phone"
            onChange={onchangehandle}
            value={formdata.phone}
            type="text"
            placeholder="Phone"
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      </div>

      <div className='px-5 py-5 text-end'>
        <Carttotal />
        <div className='px-5 py-5'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-row gap-4 items-center py-3'>
            <img
              onClick={() => setmeth('razor')}
              className={`cursor-pointer w-[80px] h-auto p-2 rounded ${meth === 'razor' ? 'bg-green-300' : ''}`}
              src={assets.razorpay_logo}
              alt='razor'
            />
            <img
              onClick={() => setmeth('stripe')}
              className={`cursor-pointer w-[80px] h-auto p-2 rounded ${meth === 'stripe' ? 'bg-green-300' : ''}`}
              src={assets.stripe_logo}
              alt='stripe'
            />
            <p
              onClick={() => setmeth('cod')}
              className={`cursor-pointer border rounded px-3 py-1 ${meth === 'cod' ? 'bg-green-300' : ''}`}
            >
              Cash on Delivery
            </p>
          </div>
          <button
            type="submit"
            className="mt-4 border rounded bg-black text-white active:bg-gray-700 hover:scale-105 cursor-pointer w-[120px] h-[40px] transition-all"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
}

export default Placeorder;
