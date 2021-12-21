import React,{useState,useEffect} from "react";
import axios from 'axios'
import { NavLink } from 'react-router-dom';
const Categories = () => {
  const [category,setCategory] = useState({});
  function getCategory(){
    //axios
  }
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
     
      <link rel="stylesheet" href="css/style.css" />
      <title>Ecommerce - Admin</title>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <a href="index.html" className="navbar-brand">
            Blogen
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <NavLink to="/adminindex" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/adminindex/productdata" className="nav-link">
                  Posts
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/categoriydata" className="nav-link active">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <a href="users.html" className="nav-link">
                  Users
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown mr-3">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="fas fa-user" /> Welcome Brad
                </a>
                <div className="dropdown-menu">
                  <a href="profile.html" className="dropdown-item">
                    <i className="fas fa-user-circle" /> Profile
                  </a>
                  <a href="settings.html" className="dropdown-item">
                    <i className="fas fa-cog" /> Settings
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a href="login.html" className="nav-link">
                  <i className="fas fa-user-times" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-success text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-folder" /> Categories
              </h1>
            </div>
          </div>
        </div>
      </header>
      {/* SEARCH */}
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Categories..."
                />
                <div className="input-group-append">
                  <button className="btn btn-success">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CATEGORIES */}
      <section id="categories">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Categories</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Web Development</td>
                      <td>May 10 2018</td>
                      <td>
                        <a href="details.html" className="btn btn-secondary">
                          <i className="fas fa-angle-double-right" /> Details
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Tech Gadgets</td>
                      <td>May 11 2018</td>
                      <td>
                        <a href="details.html" className="btn btn-secondary">
                          <i className="fas fa-angle-double-right" /> Details
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Business</td>
                      <td>May 13 2018</td>
                      <td>
                        <a href="details.html" className="btn btn-secondary">
                          <i className="fas fa-angle-double-right" /> Details
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Health &amp; Wellness</td>
                      <td>May 15 2018</td>
                      <td>
                        <a href="details.html" className="btn btn-secondary">
                          <i className="fas fa-angle-double-right" /> Details
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
export default Categories