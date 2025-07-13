import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { bakendurl } from '../App';
import { toast } from 'react-toastify';

function Add({}) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subcategory, setSubcategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([null, null, null, null]);
  const [vendorEmail, setVendorEmail] = useState(''); // ✅ NEW STATE

  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ FORM SUBMIT TRIGGERED");

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("vendorEmail"); // ✅ GET EMAIL
    if (!token || !email) {
      toast.error("❌ You must be logged in as a vendor.");
      return;
    }
    setVendorEmail(email); // ✅ SAVE TO STATE

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subcategory', subcategory);
      formData.append('price', price);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(selectedSizes));
      formData.append('vendorEmail', vendorEmail); // ✅ ADD VENDOR EMAIL

      images.forEach((img, idx) => {
        if (img) {
          console.log(`📷 Appending image${idx + 1}`);
          formData.append(`image${idx + 1}`, img);
        }
      });

      console.log("📦 Sending form data to:", `${bakendurl}/api/vendorproduct/add`);
      const response = await axios.post(
        `${bakendurl}/api/vendorproduct/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Server response:", response.data);

      if (response.data.success) {
        toast.success("✅ Product added successfully!");
        // Reset
        setProductName('');
        setDescription('');
        setCategory('Men');
        setSubcategory('Topwear');
        setPrice('');
        setBestseller(false);
        setSelectedSizes([]);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message || "❌ Upload failed.");
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      toast.error("❌ Upload failed: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Add New Product</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Upload Images */}
        <div>
          <p className="text-gray-600 font-medium mb-2">Upload Images</p>
          <div className="flex gap-4 flex-wrap">
            {[1, 2, 3, 4].map((num, idx) => (
              <div key={num} className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-blue-400 transition">
                <label htmlFor={`image${num}`} className="w-full h-full block">
                  <img
                    src={images[idx] ? URL.createObjectURL(images[idx]) : assets.upload_area}
                    alt={`Upload ${num}`}
                    className="w-full h-full object-cover"
                  />
                </label>
                <input
                  type="file"
                  id={`image${num}`}
                  className="hidden"
                  onChange={(e) => handleImageChange(idx, e.target.files[0])}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="text-gray-600 font-medium mb-1">Product Name</p>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600 font-medium mb-1">Product Description</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <p className="text-gray-600 font-medium mb-1">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <p className="text-gray-600 font-medium mb-1">Product Subcategory</p>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <p className="text-gray-600 font-medium mb-1">Product Price (₹)</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sizes */}
        <div>
          <p className="text-gray-600 font-medium mb-2">Available Sizes</p>
          <div className="flex flex-wrap gap-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
              const selected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-1 rounded-full border 
                    ${selected ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-700 border-gray-400 hover:bg-blue-100 hover:border-blue-500'}
                    focus:outline-none transition`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bestseller checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          <label className="text-gray-600 font-medium">Add to Bestseller</label>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white w-24 py-2 bg-black rounded hover:bg-gray-800 active:bg-gray-600 transition"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
