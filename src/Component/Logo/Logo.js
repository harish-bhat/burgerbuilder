import React from 'react';
import burgerLogo from '../../Assests/images/burger-logo.png';
import './Logo.css';
const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src = {burgerLogo} alt="MyBurger"/>
    </div>
);
export default logo;