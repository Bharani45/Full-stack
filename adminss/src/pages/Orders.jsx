import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { bakendurl } from '../App';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${bakendurl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setorders(response.data.orders);
      }
    } catch (error) {
      console.error("Order fetch error:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${bakendurl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Order status updated");
        fetchOrders(); // Refresh list
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const statusOptions = ['Placed', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

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

          <div className="my-2">
            <label className="font-semibold">Status: </label>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="ml-2 border px-2 py-1 rounded"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <p className="font-semibold mb-1">Items:</p>
            {Object.entries(order.items).map(([productId, sizeMap], index) => (
              <div key={index} className="pl-4 mb-2">
                <p className="font-medium">Product ID: {productId}</p>
                {Object.entries(sizeMap).map(([size, quantity]) => (
                  <p key={size} className="text-sm text-gray-700">Size: {size} × {quantity}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
