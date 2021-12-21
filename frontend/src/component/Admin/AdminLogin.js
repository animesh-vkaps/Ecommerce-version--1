import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogin=()=>{
  const navigate = useNavigate()
  
  const handleChange=()=>{
    navigate("/adminindex");
    console.log("Hello");
  }
  
  return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
       
        <title>Ecommerce - Admin</title>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">Blogen</a>
          </div>
        </nav>
        
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
            </div>
          </div>
        </section>
        {/* LOGIN */}
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Login</h4>
                  </div>
                  <div className="card-body">
                    <form action="index.html">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <input onClick={handleChange} defaultValue="Login" className="btn btn-primary btn-block" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Copyright ©
                  <span id="year" />
                  Blogen
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  
};
export default AdminLogin;