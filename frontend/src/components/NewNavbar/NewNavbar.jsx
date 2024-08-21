import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './NewNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  }

  const handleHomeClick = () => {
    setMenu("home");
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTotalItemsInCart = () => {
    return Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <>
      <div className='navbar'>
        <Link to="/" className='logo' onClick={handleHomeClick}>Quick<span>Byte</span></Link>
        <ul className='navbar-menu'>
          <a id='navlink' onClick={handleHomeClick} className={menu === "home" ? "active" : ""}>home</a>
          <a id='navlink' href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
          <a id='navlink' href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile app</a>
          <a id='navlink' href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} style={{ height: '30px' }} />
          <div className="navbar-search-icon">
            <Link to='/cart'>
              <img src={assets.shopping_bag} style={{ height: '30px' }} />
              {getTotalItemsInCart() > 0 && (
                <div className="cart-count">{getTotalItemsInCart()}</div>
              )}
            </Link>
          </div>
          {!token?<button className='' onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
          </div>
          }
          
        </div>
      </div>
      <div className='hr-div'><hr /></div>
    </>
  );
}

export default Navbar;
