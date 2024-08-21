import React from 'react';
import './Header.css';

const Header = () => {

    const scrollToMenu = () => {
        const menuSection = document.getElementById('explore-menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='header'>
            <div className='header-fd'>
                <h2 style={{ fontFamily: "kalam" }}>🎉 Get Free Delivery on orders above ₹499 🎉</h2>
            </div>
            <div className="header-contents">
                <h2 style={{ fontFamily: "kalam" }}>Order your favourite food here</h2>
                <p style={{ fontFamily: "kalam" }}>Welcome to our food delivery platform! Enjoy fast delivery from top local restaurants. Order now for a delicious meal at your fingertips!</p>
                <button onClick={scrollToMenu}>View menu</button>
            </div>
        </div>
    )
}

export default Header;
