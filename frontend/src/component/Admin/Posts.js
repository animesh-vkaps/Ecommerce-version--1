import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Dropdown } from "react-bootstrap";


const Posts = () => {
  let x = 1;
  const [product, setProduct] = useState([]);
 // console.log("data", product);

  const [singleProduct,setSingleProduct] = useState([]);
  const [skip,setSkip]=useState(0);
  const [keyword,setkeyword]=useState('');
  const [totalResults, setTotalResults] = useState(0)
   const limit=100

  //Function for getting details of a single product
  function getSIngleProduct(id){
    console.log("productId",id)
    axios.get(`/api/v1/product/${id}`).then(res=>{
      const data = res.data;
      console.log("wewe",data.product);
      setSingleProduct(data.product);
    })
  }
  // const handleChange=(e)=>{
  //   setSingleProduct({...product,[e.target.name]:e.target.value})
  // }
  //Function for getting details of all products
  const getProducts = async (limit, skip, keyword) => {
    try {
      const res = await axios.get(`/api/v1/products`, {
        params: { limit, skip, keyword },
      });
      const data = res.data;
      setProduct(data.products);
    } catch (error) {
      console.log("err:", error);
    }
  };


  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyword))
    }
    populateProducts();
    getProducts();
  }, [limit, skip, keyword]);
 
  //Function for deleting a product
  function deleteProduct(id) {
    //console.log("productId", id);
    axios.delete(`/api/v1/product/${id}`).then((res) => {
      console.log("Product is deleted successfully");
      getProducts(limit, skip, keyword);
    });
  }

  const [updatedProduct, setUpdatedProduct] = useState([]);
  const handleUpdateProduct = (e)=>{
    setSingleProduct({...singleProduct,[e.target.name] : e.target.value});
  }
  function updateProduct(id){ 
    axios.patch(`/api/v1/product/${id}`,singleProduct);
  }

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

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
                <a href="index.html" className="nav-link">
                  Dashboard
                </a>
              </li>
              <li className="nav-item px-2">
                <a href="posts.html" className="nav-link active">
                  Posts
                </a>
              </li>
              <li className="nav-item px-2">
                <a href="categories.html" className="nav-link">
                  Categories
                </a>
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
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-pencil-alt" /> Posts
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
                  placeholder="Search Posts..."
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* POSTS */}
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Posts</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Update Product</th>
                      <th>Delete</th>
                     
                    </tr>
                  </thead>

                  {product.map((item) => {
                    //console.log("Items", item);
                    return (
                      <>
                        <tbody>
                          <tr>
                            <td>{x++}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                              <a
                                to="#"
                                className="btn btn-warning btn-block-9"
                                data-toggle="modal"
                                data-target="#addPostModal"
                              >
                                <button className="btn btn-warning btn-block-9" onClick={()=>getSIngleProduct(item._id)}><i className="fas fa-plus" /> <b>Edit</b></button>
                              </a>
                              {/* ADD POST MODAL */}
                              <div className="modal fade" id="addPostModal">
                                <div className="modal-dialog modal-lg">
                                  <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
                                      <h5 className="modal-title">
                                        Edit Product
                                      </h5>
                                      <button
                                        className="close"
                                        data-dismiss="modal"
                                      >
                                        <span>×</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      
                                        <Form onSubmit={updateProduct}>
                                       
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                          >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                              type="text"
                                              placeholder="Enter Name"
                                              name="name"
                                              value={singleProduct.name}
                                              onChange={handleUpdateProduct}
                                            />
                                          </Form.Group>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                          >
                                            <Form.Label>Sku</Form.Label>
                                            <Form.Control
                                              type="String"
                                              placeholder="Enter Sku"
                                              name="sku"
                                              value={singleProduct.sku}
                                              onChange={handleUpdateProduct}
                                              //defaultValue={sip.sku}
                                            />
                                          </Form.Group>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                          >
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                              type="text"
                                              placeholder="Enter Category"
                                              name="category"
                                              value={singleProduct.category}
                                              onChange={handleUpdateProduct}
                                              //defaultValue={sip.category}
                                            />
                                          </Form.Group>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                          >
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                              type="number"
                                              placeholder="Enter Price"
                                              name="price"
                                              value={singleProduct.price}
                                              onChange={handleUpdateProduct}
                                              //defaultValue={sip.price}
                                            />
                                          </Form.Group>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                          >
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                              as="textarea"
                                              rows={3}
                                              name="description"
                                              value={singleProduct.description}
                                              onChange={handleUpdateProduct}
                                             // defaultValue={sip.description}
                                            />
                                          </Form.Group>
                                          <Form.Group
                                            controlId="formFile"
                                            className="mb-3"
                                          >
                                            <Form.Label>Upload Image</Form.Label>
                                            <Form.Control type="file" />
                                          </Form.Group>
                                          </Form>
                                        
                                        
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        onClick = {()=>updateProduct(singleProduct._id)}
                                        className="btn btn-primary"
                                        data-dismiss="modal"
                                      >
                                        Save Changes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => deleteProduct(item._id)}
                              >
                                Delete
                              </button>
                            </td>
                           
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
                </table>
                {/* PAGINATION */}
                <nav className="ml-4">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a href="#" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
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
export default Posts;
