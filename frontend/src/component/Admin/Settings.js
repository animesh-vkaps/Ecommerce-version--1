import React from 'react'
const Settings = ()=>{ 
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
                    <a href="users.html" className="nav-link">Users</a>
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
          <header id="main-header" className="py-2 bg-primary text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1>
                    <i className="fas fa-cog" /> Settings</h1>
                </div>
              </div>
            </div>
          </header>
          {/* ACTIONS */}
          <section id="actions" className="py-4 mb-4 bg-light">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <a href="index.html" className="btn btn-light btn-block">
                    <i className="fas fa-arrow-left" /> Back To Dashboard
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="index.html" className="btn btn-success btn-block">
                    <i className="fas fa-check" /> Save Changes
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* SETTINGS */}
          <section id="settings">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-header">
                      <h4>Edit Settings</h4>
                    </div>
                    <div className="card-body">
                      <form>
                        <fieldset className="form-group">
                          <legend>Allow User Registration</legend>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" defaultValue="Yes" defaultChecked /> Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" defaultValue="No" /> No
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="form-group">
                          <legend>Homepage Format</legend>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" defaultValue="posts" defaultChecked /> Blog Page
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" defaultValue="page" /> Homepage
                            </label>
                          </div>
                        </fieldset>
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
          {/* MODALS */}
          {/* ADD POST MODAL */}
          <div className="modal fade" id="addPostModal">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Add Post</h5>
                  <button className="close" data-dismiss="modal">
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select className="form-control">
                        <option value>Web Development</option>
                        <option value>Tech Gadgets</option>
                        <option value>Business</option>
                        <option value>Health &amp; Wellness</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="image">Upload Image</label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="image" />
                        <label htmlFor="image" className="custom-file-label">Choose File</label>
                      </div>
                      <small className="form-text text-muted">Max Size 3mb</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="body">Body</label>
                      <textarea name="editor1" className="form-control" defaultValue={""} />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" data-dismiss="modal">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
          {/* ADD CATEGORY MODAL */}
          <div className="modal fade" id="addCategoryModal">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">Add Category</h5>
                  <button className="close" data-dismiss="modal">
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input type="text" className="form-control" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" data-dismiss="modal">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
          {/* ADD USER MODAL */}
          <div className="modal fade" id="addUserModal">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-warning text-white">
                  <h5 className="modal-title">Add User</h5>
                  <button className="close" data-dismiss="modal">
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2">Confirm Password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-warning" data-dismiss="modal">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
  };
  export default Settings