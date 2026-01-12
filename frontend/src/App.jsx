import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // ✅ import
import Home from './pages/Home';          // ✅ import
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Content';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Placeorder from './pages/Placeorder';
import OrderSuccess from './pages/ordersuccess';
import Orders from './pages/Orders';
import './index.css';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
  import { ToastContainer, toast } from 'react-toastify';
import VendorRegister from './pages/Vendorregister';
import Test from './pages/Test';
import ChatWidget from './pages/Chatwidget.jsx';
function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <ChatWidget chatUrl="http://localhost:3000/index.html" />
      <Searchbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<Placeorder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/vendor-register' element={<VendorRegister />}/>
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path='/test' element={<Test />} />
      </Routes>
      <Footer />
    
    </div>
  );
}

export default App;
