import React from 'react'
import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Index from './component/Index';
import Contact from './component/Contact';
import Checkout from './component/Checkout';
import Cart from './component/Cart';
import About from './component/About';
import Shop from './component/Shop';
import Thankyou from './component/Thankyou';
import Navbar from './component/Navbar';
import Login from './component/Login/Login';
import AdminIndex from './component/Admin/AdminIndex';
import AdminLogin from './component/Admin/AdminLogin';
import Posts from './component/Admin/Posts';
import Categories from './component/Admin/Categories';
import Signup from './component/Users/Signup';
import UserLogin from './component/Users/UserLogin';
import Logout from './component/Users/Logout';
import Shopsingle from './component/Shopsingle';
import { CartProvider } from 'react-use-cart';
import Profilescreen from './component/Users/Profilescreen';
import OrderDetail from './component/Users/OrderDetail';
function App() {
    
    return (<>
  
        <Router>
        <CartProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/shop" element={<Shop/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/adminlogin" element={<AdminLogin/>}/>
                <Route path="/adminindex" element={<AdminIndex/>}/>
                <Route path="/adminindex/productdata" element={<Posts/>}/>
                <Route path="/adminindex/categorydata" element = {<Categories/>}/>
                <Route extact path="/signup" element={<Signup/>}/>
                <Route exact path="/userlogin" element={<UserLogin/>}/>
                <Route exact path = "/logout" element={<Logout/>}/>
                <Route exact path="/Shopsingle/:id" element={<Shopsingle/>}/>
                <Route exact path = "/checkout" element = {<Checkout/>}/>
                <Route exact path = "/thankyou" element = {<Thankyou/>}/>
                <Route exact path = "/editprofile" element = {<Profilescreen/>}/>
                <Route exact path = "/orderdetail/:id" element = {<OrderDetail/>}/>
                {/* <Route path="/thankyou" elament={<Thankyou/>}/> */}
            </Routes>
            </CartProvider>
        </Router>
        
    </>)
   
    
}

export default App;
