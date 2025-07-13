import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { bakendurl } from '../App';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const statusOptions = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${bakendurl}/api/vendororder/order`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Vendor Order fetch error:", error);
    }
  };

  const handleStatusChange = async (orderId, productKey, newStatus) => {
    try {
      const response = await axios.post(
        `${bakendurl}/api/vendororder/update`,
        { orderId, productKey, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Product status updated");
        fetchOrders();
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Vendor Update status error:", error);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-6">Vendor Orders</h1>

      {Array.isArray(orders) && orders.length === 0 && (
        <p>No orders found for your products.</p>
      )}

      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <p><strong>User ID:</strong> {order.userId}</p>
          <p><strong>Payment:</strong> {order.paymentmethod}</p>
          <p><strong>Amount:</strong> ₹{order.amount}</p>

          <div className="my-2">
            <strong>Address:</strong>
            <p>{order.address.firstname} {order.address.lastname}</p>
            <p>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipcode}</p>
            <p>{order.address.country}</p>
            <p>Phone: {order.address.phone}</p>
          </div>

          <div className="mt-3">
            <p className="font-semibold mb-2">Your Products in this Order:</p>
            {Object.entries(order.items).map(([productKey, item]) => (
              <div key={productKey} className="pl-4 mb-4 border-t pt-2">
                <p><strong>{item.name}</strong> (Size: {item.size})</p>
                <p>Quantity: {item.quantity}</p>
                <p>Status:
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, productKey, e.target.value)
                    }
                    className="ml-2 border px-2 py-1 rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
