import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })


    function handleChange(e) {

        const newdata = { ...user }
        newdata[e.target.name] = e.target.value
        setuser(newdata)
        console.log(newdata)
    }

    //Register a user
    function registerUser(e) {
        e.preventDefault();
        axios.post("/signup", {
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone
        }).then(res => {
            console.log(res.user)
        })

    }

    return (
        <>
        <div class="col-sm-8 offset-4 mt-5 mb-5 col-form-label">
        <form method="POST" onSubmit={(e) => registerUser(e)}>
          <h1> REGISTER HERE</h1> <br></br>
          <div class="form-group" class="form-group w-25">
              <label for="exampleInputEmail1">Name</label>
              <input type="email" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
            value={user.name} onChange={handleChange}
              placeholder="Enter email" autoComplete="off"/>
          </div> 
          <div class="form-group" class="form-group w-25">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
            value={user.email} onChange={handleChange}
              placeholder="Enter email" autoComplete="off"/>
          </div> 
          <br></br>
          <div class="form-group" class="form-group w-25">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" name="password" class="form-control" id="exampleInputPassword1" 
            value={user.password} onChange={handleChange}
              placeholder="Enter Password" autoComplete="off"/>
          </div> 
          <br></br>
          <div class="form-group" class="form-group w-25">
              <label for="exampleInputPassword1">Phone</label>
              <input type="number" name="phone" class="form-control" id="exampleInputPassword1" 
        value={user.phone} onChange={handleChange}
              placeholder="Enter Phone" autoComplete="off"/>
          </div>
          <br></br>
          
          <button onClick={registerUser} type="submit" class="btn btn-primary">Submit</button> <br></br>
          <NavLink to='/login'>Already have an account?</NavLink>
      </form>
        </div>
      </>
    )
}

export default Signup;
