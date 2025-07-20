import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

function Orders() {
  const { backendurl, token, products, currency } = useContext(ShopContext);
  const [orderdata, setorderdata] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const loadorderdata = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendurl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setorderdata(response.data.orders);
      }
    } catch (error) {
      console.error("Order fetch error:", error);
    }
  };

  const getProgressBar = (status) => {
    switch (status) {
      case 'Placed':
        return '🟢 Order Placed';
      case 'Processing':
        return '🔄 Processing';
      case 'Shipped':
        return '🚚 Shipped';
      case 'Delivered':
        return '✅ Delivered';
      case 'Cancelled':
        return '❌ Cancelled';
      default:
        return '⏳ Pending';
    }
  };

  useEffect(() => {
    loadorderdata();
  }, [token]);

  return (
    <div className="flex flex-col m-10">
      <Title text1={'MY'} text2={'ORDERS'} />
      <div>
        {orderdata.map((order, i) =>
          Object.entries(order.items).map(([productKey, item], j) => {
            const productId = productKey.split('_')[0];
            const product = products.find(p => p._id === productId);
            if (!product) return null;

            return (
              <div
                key={`${i}-${j}`}
                className="flex flex-col border p-4 mb-4 rounded-lg"
              >
                <div className="flex flex-row items-center justify-between gap-4">
                  {/* Left: Product Info */}
                  <div className="flex flex-row items-center gap-4 w-[40%]">
                    <img
                      className="w-[125px] h-auto object-contain"
                      src={product.image[0]}
                      alt={product.name}
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p>{currency}{product.price} × {item.quantity}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">
                        Payment Method: {order.paymentmethod?.toUpperCase() || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Center: Status */}
                  <div className="flex-1 text-center text-green-600 font-medium">
                    <p>{item.status || 'Pending'}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {getProgressBar(item.status)}
                    </p>
                  </div>

                  {/* Right: Toggle */}
                  <div
                    onClick={() =>
                      setExpandedOrderId(prev => prev === order._id ? null : order._id)
                    }
                    className="text-right text-blue-600 cursor-pointer hover:underline w-[120px]"
                  >
                    <p>{expandedOrderId === order._id ? "Hide details" : "Track order"}</p>
                  </div>
                </div>

                {/* Expanded tracking info */}
                {expandedOrderId === order._id && (
                  <div className="mt-4 px-4 text-sm text-gray-700">
                    <p>Order ID: {order._id}</p>
                    <p>Payment Status: {order.payment ? "Paid" : "Unpaid"}</p>
                    <p>
                      Estimated Delivery:{" "}
                      {new Date(
                        new Date(order.createdAt).getTime() +
                          5 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      Shipping Address: {order.address?.street},{" "}
                      {order.address?.city}, {order.address?.state},{" "}
                      {order.address?.zipcode}, {order.address?.country}
                    </p>
                    <p>Phone: {order.address?.phone}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Orders;
