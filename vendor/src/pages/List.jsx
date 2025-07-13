import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { bakendurl } from '../App';
import { toast } from 'react-toastify';

function List({ token = localStorage.getItem('vendortoken') }) {
  const [list, setList] = useState([]);


  const fetchList = async () => {
    try {
      const response = await axios.get(`${bakendurl}/api/vendorproduct/list`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Always send token
        },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || 'Failed to fetch list');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to fetch product list');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `${bakendurl}/api/vendorproduct/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Product removed');
        fetchList(); // Refresh list
      } else {
        toast.error(response.data.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Error deleting product');
    }
  };

  // ✅ Fix: Only call fetch if token is available
useEffect(() => {
  if (token) {
    console.log("📦 Token used for fetchList:", token);
    fetchList();
  } else {
    toast.error("Vendor token not found. Please log in.");
  }
}, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">All Products List</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 border-b text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <img
                    src={item.image?.[0] || 'https://via.placeholder.com/60'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">₹{item.price}</td>
                <td className="p-4">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
