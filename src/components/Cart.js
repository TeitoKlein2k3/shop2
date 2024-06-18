import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart, updateItemQuantity, clearCart } from '../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import removeIcon from '../images/trash icon.jpg'; 
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [itemToRemove, setItemToRemove] = useState(null);

  const removeItemHandler = (id) => {
    if (itemToRemove === id) {
      dispatch(removeItemFromCart(id));
      setItemToRemove(null);
      toast.success('Item removed from cart', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      setItemToRemove(id);
      toast.info('Click again to confirm removal', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const increaseQuantityHandler = (id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity: quantity + 1 }));
  };

  const decreaseQuantityHandler = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const goHomeHandler = () => {
    navigate('/');
  };

  const checkoutHandler = () => {
    dispatch(clearCart());
    setCheckoutMessage('Thank you for your purchase!');
    toast.success('Thank you for your purchase!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="cart-container">
      <h1>SHOPPING CART</h1>
      <ToastContainer />
      {checkoutMessage ? (
        <div className="center">
          <p>{checkoutMessage}</p>
          <button className="go-home-button" onClick={goHomeHandler}>Go Home</button>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="center">
          <p>There is no product in your cart!</p>
          <button className="go-home-button" onClick={goHomeHandler}>Go Home</button>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <span className="cart-item-brand" style={{color: 'rgb(157, 23, 77)'}}>{item.brand}</span>
                    <span className="cart-item-name">{item.name}</span>
                  </div>
                  <span className="cart-item-price">
                    <span style={{ color: '#ff0707' }}>$</span>
                    <span style={{ color: '#000000' }}>{item.price}</span>
                  </span>
                  <div className="cart-item-quantity">
                    <button className="quantity-button" onClick={() => decreaseQuantityHandler(item.id, item.quantity)}>-</button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      readOnly 
                      className="cart-item-quantity-input"
                    />
                    <button className="quantity-button" onClick={() => increaseQuantityHandler(item.id, item.quantity)}>+</button>
                  </div>
                  <div className="cart-item-actions">
                    <span className="cart-item-total">
                      <span style={{ color: '#ff0707' }}>$</span><span style={{ color: '#000000' }}>{item.price * item.quantity}</span>
                    </span>
                    <button className="remove-button" onClick={() => removeItemHandler(item.id)}>
                      <img src={removeIcon} alt="Remove" className="remove-icon" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="total-amount">Total Price: <span style={{ color: '#ff0707' }}>$</span><span style={{ color: '#000000' }}>{totalAmount}</span></h2>
          <div className="button-container">
            <button className="go-home-button-yellow" onClick={goHomeHandler}>Go Home</button>
            <button className="checkout-button" onClick={checkoutHandler}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
