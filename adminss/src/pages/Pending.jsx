import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { bakendurl } from '../App';
import { toast } from 'react-toastify';

function Pending() {
  const [pendingVendors, setPendingVendors] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${bakendurl}/api/vendor/pending?status=pending`);
      if (res.data.success) {
        setPendingVendors(res.data.vendors);
      } else {
        toast.error("Failed to fetch pending vendors");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching pending vendors");
    }
  };

  const approveVendor = async (vendorId) => {
    try {
      const res = await axios.post(`${bakendurl}/api/vendor/approve`, { vendorId });
      if (res.data.success) {
        toast.success("Vendor approved");
        // Refresh the list
        fetchPending();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Vendor Registrations</h2>
      {pendingVendors.length === 0 ? (
        <p>No pending registrations.</p>
      ) : (
        <div className="space-y-4">
          {pendingVendors.map((vendor) => (
            <div key={vendor._id} className="p-4 border rounded shadow flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {vendor.name}</p>
                <p><strong>Email:</strong> {vendor.email}</p>
                <p><strong>Shop:</strong> {vendor.shopName}</p>
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => approveVendor(vendor._id)}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pending;
