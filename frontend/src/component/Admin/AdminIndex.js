import React, { useState, useEffect } from 'react'
import { Form, Dropdown } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const AdminIndex = () => {
    const [file, setFile] = useState([]);
    let i = 1;
    const [order, setOrder] = useState([]);

    function getOrders(){
        axios.get("/api/v1/getorders").then((res)=>{
            const orderData = res.data;
            //console.log("orders",orderData);
            setOrder(orderData.orders);
        })
    }

    const [category, setCategory] = useState(
       { name:""}
    );

    //Handling inputs for category
    const handleCategory = (e)=>{
        const newCategory = {...category};
        newCategory[e.target.name] = e.target.value;
        setCategory(newCategory);
    }

    //Adding a new category by using axios
    function addCategory(e){
        e.preventDefault();
        axios.post("/api/v1/category/addcategory",{
            name : category.name
        }).then(res=>{
            console.log("fydytfyf",res.category)
        })
    }

    const [product, setProduct] = useState({
        name: "",
        sku: "",
        category: "",
        price: "",
        description: ""
    })
    
    
    //Handling inputs for products
    function handleChange(e) {
        const newdata = { ...product }
        newdata[e.target.name] = e.target.value
        setProduct(newdata)
        console.log(newdata)
    }
    
    // //Adding a new product by using axios
    // function addProduct(e) {
    //     e.preventDefault();
    //     axios.post("api/v1/product/new", {
    //         name: product.name,
    //         sku: product.sku,
    //         category: product.category,
    //         price: product.price,
    //         description: product.description,
            
    //     }).then(res => {
    //         console.log(res.product)
    //     })
    // }
    async function addProduct(e) {
        e.preventDefault();
    
        const { name, category, description, price, sku } = product;
    
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("sku", product.sku);
        formData.append("price", product.price);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("productImage", file);
    
        const productBody = formData;
        try {
          await axios.post("/api/v1/product/new", productBody, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (err) {
          console.log(err.message);
        }
      }


    const [cate, setCate] = useState([]);
    console.log("manjeet",cate)
    let names,values;
    const handleInputs = (e) => {
        console.log(e)
  
        names=e.target.name;
        values=e.target.value;
  
        setCate({...product,[names]:values})
    }

    function getCategory(){
        axios.get("/api/v1/category").then((res)=>{
            const cateData = res.data;
            console.log("category",cateData);
            setCate(cateData.category);
        })
    }
    useEffect(()=>{
        getCategory();
        getOrders();
    },[])
   

    return (
    <>
        {
            order.map((orders)=>{
                console.log("orders",orders);
            })
        }
        <div>
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
                    <div className="container">
                        <NavLink to="/Index" className="navbar-brand">AdminPanel</NavLink>
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav">

                                <li className="nav-item px-2">
                                    <NavLink to="/adminindex/productdata" className="nav-link">Products</NavLink>
                                </li>
                                <li className="nav-item px-2">
                                    <NavLink to="/adminindex/categorydata" className="nav-link">Categories</NavLink>
                                </li>
                                <li className="nav-item px-2">
                                    <NavLink to="users.html" className="nav-link">Users</NavLink>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Admin Settings
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                                <li className="nav-item">
                                    <NavLink to="/Adminlogin" className="nav-link">
                                        <i className="fas fa-user-times" /> Logout
                                    </NavLink>
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
                                    <i className="fas fa-cog" /> Welcome Admin</h1>
                            </div>
                        </div>
                    </div>
                </header>
                {/* ACTIONS */}
                <section id="actions" className="py-4 mb-4 bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <NavLink to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                                    <i className="fas fa-plus" /> Add Product
                                </NavLink>
                            </div>
                            <div className="col-md-3">
                                <NavLink to="#" className="btn btn-success btn-block" data-toggle="modal" data-target="#addCategoryModal">
                                    <i className="fas fa-plus" /> Add Category
                                </NavLink>
                            </div>
                            <div className="col-md-3">
                                <NavLink to="#" className="btn btn-warning btn-block" data-toggle="modal" data-target="#addUserModal">
                                    <i className="fas fa-plus" /> Add User
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
                {/* POSTS */}
                <section id="posts">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Recent Orders</h4>
                                    </div>
                                    <table className="table table-striped">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th> User</th>
                                               
                                                <th> Price</th>
                                                <th>Date</th>
                                                <th>Details</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                    order.map((orderItem)=>{
                                                        return(
                                                            <>
                                                                <tr>
                                                                    <td>{i++}</td>
                                                                    <td>{orderItem.user}</td>
                                                                    <td>{orderItem.totalPrice}</td>
                                                                    <td>{orderItem.updatedAt}</td>
                                                                    <td>
                                                                        <NavLink to="details.html" className="btn btn-secondary">
                                                                            <i className="fas fa-angle-double-right" /> Details
                                                                        </NavLink>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                }
                                            {/* <tr>
                                                
                                               
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>
                                                    <NavLink to="details.html" className="btn btn-secondary">
                                                        <i className="fas fa-angle-double-right" /> Details
                                                    </NavLink>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>
                                                    <NavLink to="details.html" className="btn btn-secondary">
                                                        <i className="fas fa-angle-double-right" /> Details
                                                    </NavLink>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>
                                                    <NavLink to="details.html" className="btn btn-secondary">
                                                        <i className="fas fa-angle-double-right" /> Details
                                                    </NavLink>
                                                </td>
                                            </tr> */}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card text-center bg-primary text-white mb-3">
                                    <div className="card-body">
                                        <h3>Product</h3>
                                        <h4 className="display-4">
                                            <i className="fas fa-pencil-alt" /> 6
                                        </h4>
                                        <NavLink to="posts.html" className="btn btn-outline-light btn-sm">View</NavLink>
                                    </div>
                                </div>
                                <div className="card text-center bg-success text-white mb-3">
                                    <div className="card-body">
                                        <h3>Categories</h3>
                                        <h4 className="display-4">
                                            <i className="fas fa-folder" /> 4
                                        </h4>
                                        <NavLink to="categories.html" className="btn btn-outline-light btn-sm">View</NavLink>
                                    </div>
                                </div>
                                <div className="card text-center bg-warning text-white mb-3">
                                    <div className="card-body">
                                        <h3>Users</h3>
                                        <h4 className="display-4">
                                            <i className="fas fa-users" /> 4
                                        </h4>
                                        <NavLink to="users.html" className="btn btn-outline-light btn-sm">View</NavLink>
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
                                    Shoppers
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
                                <h5 className="modal-title">Add Product</h5>
                                <button className="close" data-dismiss="modal">
                                    <span>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Form onSubmit={addProduct}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" name="name" onChange={handleChange} value={product.name}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Sku</Form.Label>
                                        <Form.Control type="String" placeholder="Enter Sku" name="sku" onChange={handleChange} value={product.sku}  />
                                    </Form.Group>
                                    <div class="form-group">
                                        <label >Category</label>
                                        <Form.Select
                                        aria-label="Default select example"
                                        name="category"
                                        onChange={handleChange}
                                        >
                                        <option>Category</option>
                                        {cate.map((item) => {
                                            console.log(item, "items");
                                            return <option value={item._id}>{item.name}</option>;
                                        })}
                                        </Form.Select>
                                    </div>
                                    {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Category" name="category" onChange={handleChange} value={product.category}/>
                                    </Form.Group> */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Price" name="price" onChange={handleChange} value={product.price}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} value={product.description} />
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload Image</Form.Label>
                                        <Form.Control type="file" onChange={(e)=>setFile(e.target.files[0])}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={addProduct} className="btn btn-primary" data-dismiss="modal"  >Save Changes</button>
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
                                <Form onSubmit={addCategory}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" name="name" value={category.name} onChange={handleCategory} />
                                    </Form.Group>

                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload Image</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>

                                </Form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" data-dismiss="modal" type='submit' onClick={addCategory}>Save Changes</button>
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
            </div >

        </div >
    </>)
    
}
export default AdminIndex;