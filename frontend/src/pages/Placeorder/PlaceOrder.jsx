import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Avoid mutating the original item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() > 499 ? getTotalCartAmount() : getTotalCartAmount() + 39
    };
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      
      console.log(response.data); // Log the full response
  
      if (response.data.success) {
        const { session_url } = response.data;
        console.log(`Redirecting to: ${session_url}`); // Log the session URL
        window.location.replace(session_url);
      } else {
        alert("Error placing order: " + response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token)
    {
      navigate("/cart")
    }
    else if(getTotalCartAmount()===0)
    {
      navigate("/cart")
    }
  },[token])
  

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery information</p>
        <div className="multi-fields">
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type="text" placeholder='first name' />
          <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='last name' />
        </div>
        <input required name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='email address' />
        <input required name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='street' />
        <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='city' />
          <input required name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='state' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} type="text" placeholder='pin code' />
          <input required name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='country' />
        </div>
        <input required name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='mobile number' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() >= 499 ? 0 : 39}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() >= 499 ? getTotalCartAmount() : getTotalCartAmount() + 39}</b>
            </div>
          </div>
          <button type='submit'>proceed to payment</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
