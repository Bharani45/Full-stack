import { createContext, useEffect } from "react";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// 1. Create the context
export const ShopContext = createContext();

// 2. Create the provider component
export const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const delivery = 10;
  const backendurl= import.meta.env.VITE_BACKEND_URL
  const [search,setsearch]=useState('');
  const [showsearch,setshowsearch]=useState(true);
  const [cartitem,setcart]=useState({});
  const navi=useNavigate();
  const [token,setTok]=useState('');
  const [products,setp]=useState([]);

  const addtocart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select size');
      return;
    }

    try {
      const response = await axios.post(`${backendurl}/api/cart/add`, { itemId, size }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setcart(response.data.cartdata);
        toast.success("Added to cart");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Add to cart failed");
    }
  };
const updateCartItem = async (itemId, size, newQty) => {
  // 1. Update local state
  setcart((prev) => {
    const updated = { ...prev };
    if (updated[itemId] && updated[itemId][size] !== undefined) {
      updated[itemId][size] = newQty;
    }
    return updated;
  });

  // 2. Sync with backend
  if (token) {
    try {
      const response = await axios.post(
        `${backendurl}/api/cart/update`,
        { itemId, size, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        toast.error("Backend cart update failed");
      }
    } catch (error) {
      console.error("Update cart failed:", error);
      toast.error("Error updating cart on server");
    }
  }
};

const getusecart=async(token)=>{
  try {
    const response=await axios.post(backendurl+'/api/cart/get',{},{ headers: { Authorization: `Bearer ${token}` } })
    if(response.data.success){
      setcart(response.data.cartdata);
    }
  } catch (error) {
    console.log(error);
  }
}

const getcount=()=>{
  let cnt=0;
  for(const items in cartitem){
    for(const item in cartitem[items]){
      try{
        if(cartitem[items][item]>0){
          cnt+=cartitem[items][item];
        }
      }
      catch(error){

      }
    }
  }
  return cnt;
}
const getcartamt=()=>{
  let total=0;
  for(const items in cartitem){
    let iteminfo=products.find((product)=>product._id===items);
    for(const item in cartitem[items]){
      try {
        if(cartitem[items][item]>0){
          total+=iteminfo.price* cartitem[items][item]
        }
      } catch (error) {
        
      }
    }
  }
  return total;
}
const getproduct = async () => {
  try {
    const response = await axios.get(backendurl + '/api/product/list');
    console.log("product lst", response.data); // ✅ Correctly logs API data

    if (response.data.success) {
      setp(response.data.products); // ✅ Updates state
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  useEffect(()=>{
    console.log(cartitem);
  },[cartitem])
    useEffect(()=>{
    getproduct();
  },[])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setTok(localStorage.getItem('token'));
      getusecart(localStorage.getItem('token'));
    }
  })

  useEffect(() => {
  console.log("Updated products:", products);
}, [products]);




   
  const value = {
    products,
    currency,
    delivery,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    addtocart,
    getcount,
    cartitem,setcart,
    updateCartItem,
    getcartamt,navi,
    backendurl,token,setTok
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
