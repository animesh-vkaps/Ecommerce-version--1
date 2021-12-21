import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
const ProfileScreen = () => {
  const [ myOrders, setMyOrder] = useState([]);

  const getUserOrders = async()=>{
    try{
      const userToken = JSON.parse(localStorage.getItem('token')).tokens[0].token;
      const headers = {
        Authorization : `Bearer ${userToken && userToken}`
      }
     // const res = await axios.get('/api/v1/getmyorders',{ headers })
      await axios.get("/api/v1/getmyorders", { headers }).then((res)=>{
        const userOrderData = res.data;
        console.log(userOrderData);
        setMyOrder(userOrderData)
      }) 
     
    }
    catch(error){ 
      console.log(error);
    }
  }
  const id = JSON.parse(localStorage.getItem("token"))._id;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('token')))
  console.log(user)
  const handleChange = (e) =>{
    setUser({...user,[e.target.name] : e.target.value});
  }
  //   const oContext = useContext(OrderContext)
  //   const { myOrders, getMyOrders } = oContext
  async function updateUser(id){
    const { data } = await axios.patch(`/api/v1/users/${id}`,user);
  }
  const handleSave = (e)=>{
    e.preventDefault();
    updateUser(id);
    
  }
  useEffect(() => {
    getUserOrders();
    
  }, [])

  return (
    <>
      {
        myOrders.map(orders=>{
          console.log("object",orders);
        })
      }
      {/* ACTIONS */}
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link to="/" className="btn btn-secondary btn-block">
                <i className="fas fa-arrow-left" /> Back to Home
              </Link>
            </div>
            <div className="col-md-4">
              <button disabled className="btn btn-success btn-block">
                <i className="fas fa-lock" /> Change Password
              </button>
            </div>
            <div className="col-md-4">
              <button disabled className="btn btn-danger btn-block">
                <i className="fas fa-trash" /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* PROFILE */}
      <section id="profile" className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h4>Edit Profile</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSave}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value = {user.name}
                        onChange = {handleChange}
                        className="form-control"
                        
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value = {user.email}
                        onChange= {handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value = {user.phone}
                        onChange = {handleChange}
                        className="form-control"
                        
                      />
                    </div>

                    <div className="form-group">
                      <button
                        
                        type="submit"
                        className="btn btn-dark btn-block"
                      >
                        Submit me
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3 my-3 ml-auto">
              <h3>Your Avatar</h3>
              <img
                src="img/avatar.png"
                alt=""
                className="d-block img-fluid mb-3"
              />
              <button className="btn btn-primary btn-block">Edit Image</button>
              <button className="btn btn-danger btn-block">Delete Image</button>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>My Orders</h4>
              </div>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Order Id</th>
                    <th>Order Items</th>
                    <th>Order Price</th>
                    <th>Order Date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {myOrders.length > 0 ? (
                    myOrders.map(order => (
                      
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.orderItems.length} item(s)</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Link
                            to={`/orderdetail/${order._id}`}
                            className="btn btn-secondary">
                            <i className="fas fa-angle-double-right" /> Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <h3 className="text-center">You have no orders yet </h3>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileScreen