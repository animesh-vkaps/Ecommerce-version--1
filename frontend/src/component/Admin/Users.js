import React from 'react'
const Users=()=>{
      return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
         
          <title>Ecommerce - Admin</title>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
            <div className="container">
              <a href="index.html" className="navbar-brand">Blogen</a>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav">
                  <li className="nav-item px-2">
                    <a href="index.html" className="nav-link">Dashboard</a>
                  </li>
                  <li className="nav-item px-2">
                    <a href="posts.html" className="nav-link">Posts</a>
                  </li>
                  <li className="nav-item px-2">
                    <a href="categories.html" className="nav-link">Categories</a>
                  </li>
                  <li className="nav-item px-2">
                    <a href="users.html" className="nav-link active">Users</a>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown mr-3">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
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
          <header id="main-header" className="py-2 bg-warning text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-users" /> Users</h1>
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
                    <input type="text" className="form-control" placeholder="Search Users..." />
                    <div className="input-group-append">
                      <button className="btn btn-warning">Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* USERS */}
          <section id="users">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-header">
                      <h4>Latest Users</h4>
                    </div>
                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>John Doe</td>
                          <td>jdoe@gmail.com</td>
                          <td>
                            <a href="details.html" className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" /> Details
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Harry White</td>
                          <td>harry@yahoo.com</td>
                          <td>
                            <a href="details.html" className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" /> Details
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Mary Johnson</td>
                          <td>mary@gmail.com</td>
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
  export default Users