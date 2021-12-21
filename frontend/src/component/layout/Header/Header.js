import React from 'react'
import { ReactNavbar} from 'overlay-navbar';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div>
            {/* <ReactNavbar/> */}
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Contact Us</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
            <li>
                <Link to="/product">Product</Link>
            </li>
        </div>
    )
}

export default Header
