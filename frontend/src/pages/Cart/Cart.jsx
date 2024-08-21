import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{(item.price) * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)}><img src={assets.del} className='del-image' alt="" /></p>
                </div>
                <hr />
              </>
            )
          }
        })
        }
      </div>
      <div className='cart-bottom'>
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
              <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()>=499?0:39}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()>=499?getTotalCartAmount():getTotalCartAmount()+39}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>proceed to checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have promo code enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
