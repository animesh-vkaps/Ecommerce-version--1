import React,{useState,useEffect} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const axios = require('axios');
 
const UserLogin = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();
    // function handleChange(e) {

    //     const newdata = { ...user }
    //     newdata[e.target.name] = e.target.value
    //     setuser(newdata)
    //     console.log(newdata)
    // }

    function userlogin(e) {
        e.preventDefault();
        axios.post("/login", {
            email: email,
            password: password
        }).then(res => {
            console.log("res",res)
            if (res.status === 422 || !res) {
                window.alert("Invalid credentials");
            } else {
                if(res.data.token && res.data.userLogin.role === "user"){
                    // localStorage.setItem("token", res.data.token);
                    localStorage.setItem("token", JSON.stringify(res.data.userLogin));
                    window.alert('LOGIN SUCCESSFULL')
                    history('/');
                }else if( res.data.userLogin.role === "admin"){
                    history('/AdminIndex')
                }
            }
        })

    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }


    return (
    <>
    <div className="col-sm-8 offset-4 mt-5 mb-5 col-form-label">
    <form method="POST"  onSubmit={handleSubmit}>
            
            <h1> LOGIN HERE</h1> <br></br>
            <div className="form-group" className="form-group w-25">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                value={email}       onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"/>
            </div> 
    
            <br></br>
    
            <div className="form-group" className="form-group w-25">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" 
                value={password}    onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"/>
            </div> <br></br>
    
            <br></br>
                        
                    <button type="submit"  disabled={!validateForm()} onClick={userlogin} className="btn btn-primary" >Submit</button> <br></br>
                    {/* <NavLink to='/signup'>Not registered yet?</NavLink> */}
        </form> 
    </div>  
    </>
    )
}

export default UserLogin;