import React,{useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// import { UserContext } from '../App';

const Logout = () => {

    // const {state,dispatch}=useContext(UserContext);

    const history=useNavigate();

   

        function logoutuser() {
            axios.get("/api/v1/logout").then(res => {
            console.log("logont")
            localStorage.clear();
            if (res.status === 200 || !res) {
                window.alert("Logout Successful");
            }
            history("/userlogin")
        })
}
        // fetch('/logout',{
        //     method:"GET",
        //     headers:{
        //         Accept:"application/json",
        //         "Content-Type":"application/json"
        //     },
        //     credentials:"include"
        // }).then((res)=>{
        //     // dispatch({type:"USER",payload:false})
        //     // history.push('/login',{replace:true});
        //     localStorage.clear()
        //     if(res.status != 200){
        //         const error=new Error(res.error)
        //         throw error;
        //     }
        //     history('/userlogin');
        // }).catch((err)=>{
        //     console.log(err);
        // })
   
    useEffect(() => {
        logoutuser()
       
        
    }, [])
    
    return (
        <>
        </>
    )
}

export default Logout