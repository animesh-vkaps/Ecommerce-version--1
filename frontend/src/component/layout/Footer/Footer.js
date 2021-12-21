import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png';
import './Footer.css';
const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download our app for Android and IOS mobile</p>
                <img src={playStore} alt="playstore"/>
                <img src={appStore} alt="Appstore"/>
            </div>
            <div className="midFooter">
                <h1>Ecommerce</h1>
                <p>Some text</p>
                <p>Copyright 2021 &copy; Vkaps IT Solutions</p>
            </div>
            <div className="rightFooter">
                <h1>Follow us</h1>
                <a href="#">Instagram</a>
                <a href="#">Youtube</a>
                <a href="#">Facebook</a>
            </div>
        </footer>
    )
}

export default Footer
