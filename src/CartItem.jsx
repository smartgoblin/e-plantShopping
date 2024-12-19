import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, updateCartQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const reduxDispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let grandTotal = 0;
    cart.forEach((c) => {
      let total = 0;
      total = c.cost * c.quantity;
      grandTotal += total;
    });
    return grandTotal;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    // dispatch to update state
    const incrementedQuantity =  item.quantity + 1;
    reduxDispatch(
      updateCartQuantity({ name: item.name, quantity: incrementedQuantity })
    ); // dispatch to CartSlice
  };

  const handleDecrement = (item) => {
    // dispatch to update state if there are quantities of this item
    console.log(item.quantity);
    if(item.quantity>1){
      const decrementedQuantity =  item.quantity - 1;
      reduxDispatch(
        updateCartQuantity({ name: item.name, quantity: decrementedQuantity })
      ); // dispatch to CartSlice
    }
    else{ // dispatch to remove item as we reached zero
      reduxDispatch(removeCartItem(item.name));
    }
  };

  const handleRemove = (item) => {
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
      let total = 0;
      total = item.cost * item.quantity;
      return total;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


