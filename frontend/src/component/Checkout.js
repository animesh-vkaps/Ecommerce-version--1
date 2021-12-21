import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Link } from "react-router-dom";


var Checkout = () => {
  const {
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    items,
  } = useCart();
  const [orderItems, setOrderItems] = useState([])
const [PaymentMethod,setPaymentMethod]=useState('')
  
  const [address, setAddress] = useState({
    name : "",
    phone : "",
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })
  const placeOrder = async (
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentResult  ) => {
    const productBody = {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentResult
    }
    try {
      const userToken = JSON.parse(localStorage.getItem('token'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      await axios.post('api/v1/order', productBody, { headers })
      console.log('order placed')
    
    } catch (err) {
     console.log(err)
    }
  }
  const handlePlaceOrder = () => {
    
    const userid = JSON.parse(localStorage.getItem("token"))._id;
    console.log("handlePlaceOrder",userid, orderItems, address, PaymentMethod, cartTotal);

    if(PaymentMethod === "cod"){
      placeOrder(userid, orderItems, address, PaymentMethod, cartTotal)
    }

    else if(PaymentMethod === "razorpay"){
      displayRazorpay(cartTotal);
    }

    
  }
  useEffect(() => {
    const newArr = items.map(
      ({ category, createdAt, id, updatedAt, __v, _id, ...keep }) => keep
    )
  
    setOrderItems(newArr)
    // eslint-disable-next-line
  }, [])
  
  
  const handleChange = (e)=>{
    setAddress({...address,[e.target.name]:e.target.value})
  }

 
  //Payment Method RAZORPAY
  async function displayRazorpay(
    
    totalPrice
  ) {
    const productOnline = {

      totalPrice
    }
    console.log("display",productOnline)
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }


     const {data} = await axios.post("/api/v1/razorpay",{productOnline});
      console.log('razor',data);

    const userid = JSON.parse(localStorage.getItem("token"))._id;
    console.log("handlePlaceOrder",userid, orderItems, address, PaymentMethod, cartTotal);


    const options = {
      key: "rzp_test_bTqFRAbhbpekgn", // Enter the Key ID generated from the Dashboard
      amount: Number(cartTotal), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      order_id: data.id,
      name: "Shoppers",
      description: "Test Transaction",
      image: "https://image.freepik.com/free-vector/logo-sample-text_355-558.jpg",
      //This is a sample Order ID. Pass the id obtained in the response of Step 1
      
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        placeOrder(userid,
          orderItems,
          address,
          PaymentMethod,
          cartTotal,
          {paymentID:response.razorpay_payment_id, orderID:response.razorpay_order_id, sign:response.razorpay_signature} )
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
 //Stripe payment--------------------------------------------------------------
  const makePayment = token =>{
    
    const body = {
      token,
      cartTotal
    };
    console.log("body",body);
    const userToken = JSON.parse(localStorage.getItem('token'))
    const headers = {
      Authorization: `Bearer ${userToken && userToken}`,
    }
    axios.post("/api/v1/makepayment",body,headers).then((res)=>{
      console.log("Payment Successful");
      const { status } = res.status;
      console.log("STATUS",status);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div>
      <title>Shoppers — Colorlib e-Commerce Template</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <div className="site-wrap">
        <div className="bg-light py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-0">
                <a href="index.html">Home</a>{" "}
                <span className="mx-2 mb-0">/</span>{" "}
                <a href="cart.html">Cart</a>{" "}
                <span className="mx-2 mb-0">/</span>{" "}
                <strong className="text-black">Checkout</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="border p-4 rounded" role="alert">
                  Returning customer? <a href="#">Click here</a> to login
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-5 mb-md-0">
                <h2 className="h3 mb-3 text-black">Billing Details</h2>
                <div className="p-3 p-lg-5 border">
                  
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="name" className="text-black">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value = {address.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="phone" className="text-black">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value = {address.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                  </div>
                  <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_address" className="text-black">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="c_address"
                      name="address"
                      cols={30}
                      rows={5}
                      value={address.address}
                      onChange={handleChange}
                      placeholder="Street address"></textarea>
                  </div>
                </div>
                  
                <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="city" className="text-black">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value = {address.city}
                        onChange={handleChange}
                      />
                    </div>
                    
                </div>
                  
                <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="country" className="text-black">
                        Country<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value = {address.country}
                        onChange={handleChange}
                      />
                    </div>
                    
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="postalCode" className="text-black">
                        Postal Code<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        name="postalCode"
                        value = {address.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                    
                  
                  </div>
                  
                  
                  
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                    <div className="p-3 p-lg-5 border">
                      <label htmlFor="c_code" className="text-black mb-3">
                        Enter your coupon code if you have one
                      </label>
                      <div className="input-group w-75">
                        <input
                          type="text"
                          className="form-control"
                          id="c_code"
                          placeholder="Coupon Code"
                          aria-label="Coupon Code"
                          aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary btn-sm"
                            type="button"
                            id="button-addon2"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                    <div className="p-3 p-lg-5 border">
                      <table className="table site-block-order-table mb-5">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {item.name}
                                    <strong className="mx-2">x</strong>{" "}
                                    {item.quantity}
                                  </td>
                                  <td>${item.price * item.quantity}</td>
                                </tr>
                              </>
                            );
                          })}
                          <tr>
                            <td className="text-black font-weight-bold">
                              <strong>Order Total</strong>
                            </td>
                            <td className="text-black font-weight-bold">
                              <strong>${cartTotal}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="border p-3 mb-3">
                      <label className="text-black">
                        Payment Method <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        name="paymentMethod"
                        onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="">Select</option>
                        <option value="razorpay">Pay using RazorPay</option>
                        <option value="cod">Cash On delivery</option>
                        <option value="stripe">Pay using Stripe</option>
                        
                      </select>
                      </div>
                      <div className="form-group">
                      {
                        (PaymentMethod === "cod")?
                        <Link

                          to="/thankyou"
                          className="btn btn-danger btn-lg py-3 btn-block"
                         
                          onClick={handlePlaceOrder}
                        >
                          Place Order
                        </Link> : (PaymentMethod === "razorpay")?   <button className="btn btn-primary btn-lg py-3 btn-block" 
                          onClick={handlePlaceOrder}
                        >
                          RazorPay
                        </button>:(PaymentMethod === "stripe")?    
                        <StripeCheckout
                          stripeKey= {process.env.REACT_APP_KEY}
                          token = {makePayment}
                          name = "Buy now"
                          amount = {cartTotal * 100}
                          shippingAddress
                          billingAddress
                        >
                          <button className="btn btn-warning btn-lg py-3 btn-block">Pay with Stripe</button>
                        </StripeCheckout>:<h3><b>Please choose one payment method.</b></h3>              
                      }
                        
                        
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
        <footer className="site-footer border-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="footer-heading mb-4">Navigations</h3>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#">Sell online</a>
                      </li>
                      <li>
                        <a href="#">Features</a>
                      </li>
                      <li>
                        <a href="#">Shopping cart</a>
                      </li>
                      <li>
                        <a href="#">Store builder</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#">Mobile commerce</a>
                      </li>
                      <li>
                        <a href="#">Dropshipping</a>
                      </li>
                      <li>
                        <a href="#">Website development</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#">Point of sale</a>
                      </li>
                      <li>
                        <a href="#">Hardware</a>
                      </li>
                      <li>
                        <a href="#">Software</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <h3 className="footer-heading mb-4">Promo</h3>
                <a href="#" className="block-6">
                  <img
                    src="images/hero_1.jpg"
                    alt="Image placeholder"
                    className="img-fluid rounded mb-4"
                  />
                  <h3 className="font-weight-light  mb-0">
                    Finding Your Perfect Shoes
                  </h3>
                  <p>Promo from nuary 15 — 25, 2019</p>
                </a>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="block-5 mb-5">
                  <h3 className="footer-heading mb-4">Contact Info</h3>
                  <ul className="list-unstyled">
                    <li className="address">
                      203 Fake St. Mountain View, San Francisco, California, USA
                    </li>
                    <li className="phone">
                      <a href="tel://23923929210">+2 392 3929 210</a>
                    </li>
                    <li className="email">emailaddress@domain.com</li>
                  </ul>
                </div>
                <div className="block-7">
                  <form action="#" method="post">
                    <label htmlFor="email_subscribe" className="footer-heading">
                      Subscribe
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control py-4"
                        id="email_subscribe"
                        placeholder="Email"
                      />
                      <input
                        type="submit"
                        className="btn btn-sm btn-primary"
                        defaultValue="Send"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <p>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with{" "}
                  <i className="icon-heart" aria-hidden="true" /> by{" "}
                  <a
                    href="https://colorlib.com"
                    target="_blank"
                    className="text-primary"
                  >
                    Colorlib
                  </a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Checkout;
