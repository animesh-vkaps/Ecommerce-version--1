import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const OrderDetail = () => {
  const {id}=useParams();
    // const [details,setDetails]=useState([]);
    
    const [details, setDetails] = useState({
        shippingAddress: {},
        paymentResult: {
          paymentStatus : null
        },
        orderItems: [],
        user: {},
      })
      console.log("details",details)

    const getorder = async (id) => {
        try {
            const {data} = await axios.get(`/api/v1/getoneorder/${id}`);
            console.log("data",data)
          setDetails(data);
        //   console.log("details:", data);
        } catch (error) { 
          console.log("err:", error);
        }
      };
  console.log(details.paymentResult, "line 27")
    useEffect(() => {
        getorder(id)
    }, [])
    return (
      <div>
        
         <section className="h-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{borderRadius: '10px'}}>
              <div className="card-header px-4 py-5">
                <h5 className="text-muted mb-0">Thanks for your Order <span style={{color: '#a8729a'}}></span></h5>
              </div>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0" style={{color: '#a8729a'}}>Receipt</p>
                  <p className="small text-muted mb-0">Receipt Voucher : 1KAU9-84UIL</p>
                </div>
                
             
                {details.orderItems.map((el)=>{
                  console.log("ele",el.productImage);
              return(<>
         
                <div className="card shadow-0 border mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <img src={el.productImage} className="img-fluid" alt="Phone" />
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0"> {el.name}</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">White</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">Capacity: 64GB</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small"> {el.quantity}</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small"> {el.price}</p>
                      </div>
                    </div>
                    <hr className="mb-4" style={{backgroundColor: '#e0e0e0', opacity: 1}} />
                    <div className="row d-flex align-items-center">
                      <div className="col-md-2">
                        <p className="text-muted mb-0 small">Track Order</p>
                      </div>
                      <div className="col-md-10">
                        <div className="progress" style={{height: '6px', borderRadius: '16px'}}>
                          <div className="progress-bar" role="progressbar" style={{width: '65%', borderRadius: '16px', backgroundColor: '#a8729a'}} aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="d-flex justify-content-around mb-1">
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                </>)
          })}
        
    
                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Shipping Address</p>
                 
                </div>
                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">Address: {details.shippingAddress.address}</p>
                  <p className="text-muted mb-0"><span className="fw-bold me-4">Total price</span> {details.totalPrice}</p>
                </div>
                <div className="d-flex justify-content-between mb-5">
                  <p className="text-muted mb-0">Country: {details.shippingAddress.country}</p>
                  <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">City: {details.shippingAddress.city}</p>
                  {/* <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p> */}
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Phone: {details.shippingAddress.phone}</p>
                  {/* <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p> */}
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Postalcode: {details.shippingAddress.postalCode}</p>
                  
                  {/* <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p> */}
                </div>
                
                {
                  (details.paymentMethod === "cod")?
                  <div className="d-flex justify-content-between pt-2">
                 
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Payment Status : </span> {details.paymentResult.paymentStatus}</p>
                  </div>
                  :
                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Payment Status : </span> Paid</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Order ID : </span> {details.paymentResult.orderID}</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">paymentID ID : </span> {details.paymentResult.paymentID}</p>
                    
                  </div>
                }
     

              </div>
              <div className="card-footer border-0 px-4 py-5" style={{backgroundColor: '#a8729a', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total paid: <span className="h2 mb-0 ms-2">{details.totalPrice}</span></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 
      </div>
  )
}

export default OrderDetail
