import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/title';
import Productitem from '../components/Productitem';
import { assets } from '../assets/assets';
import Carttotal from '../components/Carttotal';

function Cart() {
  const {
    products,
    currency,
    cartitem,
    updateCartItem,
    removeFromCart,  // ✅ Add this from context
    navi,
  } = useContext(ShopContext);

  const [dcart, scart] = useState([]);

  // ✅ Remove item from cart (globally and locally)
  const handleRemove = (itemId, size) => {
    removeFromCart(itemId, size); // remove from context + backend
    scart((prev) => prev.filter((item) => !(item._id === itemId && item.size === size))); // update local view
  };

  // Refresh display cart on cartitem change
  useEffect(() => {
    const temp = [];
    if (products.length > 0) {
      for (const productId in cartitem) {
        for (const size in cartitem[productId]) {
          if (cartitem[productId][size] > 0) {
            temp.push({
              _id: productId,
              size: size,
              quantity: cartitem[productId][size],
            });
          }
        }
      }
    }
    scart(temp);
  }, [cartitem, products]);

  return (
    <div>
      <Title text1={'YOUR'} text2={'CART'} />
      <div>
        {dcart.map((item, index) => {
          const data = products.find((product) => product._id === item._id);
          if (!data) return null;

          return (
            <div
              key={index}
              className="flex border-[0.05px] flex-row w-full items-center gap-4 mb-4 px-4"
            >
              {/* Image */}
              <img
                src={data.image[0]}
                alt={data.name}
                className="w-20 h-20 object-cover rounded"
              />

              {/* Info */}
              <div className="flex flex-col flex-grow">
                <p className="font-bold">{data.name}</p>
                <p>Size: {item.size}</p>
                <p>
                  {currency}
                  {data.price}
                </p>
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
                    if (newQty >= 1)
                      updateCartItem(item._id, item.size, newQty);
                  }}
                />
              </div>

              {/* Delete */}
              <img
                onClick={() => handleRemove(item._id, item.size)}
                src={assets.bin_icon}
                className="cursor-pointer w-[30px] ml-auto"
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      {/* Total + Place Order */}
      <div className="flex flex-col items-end gap-4 mt-6">
        <Carttotal />
        <div className="px-10">
          <button
            onClick={() => navi('/place-order')}
            className="border rounded bg-black text-white active:bg-gray-700 hover:scale-105 cursor-pointer w-[120px] h-[40px] transition-all"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
