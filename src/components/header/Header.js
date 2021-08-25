import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import './Header.css';
import cartIcon from '../../images/shopping-cart.png';

function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <h1>StayFresh</h1>
      </div>
      <div className='nav'>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
          <li className='cart-icon-wrapper'>
            <img src={cartIcon} alt='Shopping cart' className='cart' />
            <CartItemsIndicator />
          </li>
        </ul>
      </div>
    </div>
  );
}

function CartItemsIndicator() {
  const cartData = useContext(AppContext);
  console.log(cartData);
  useEffect(() => {
    console.log(cartData);
  }, [cartData.cart]);

  let cartItems = 0;
  cartData.cart.map((item) => {
    cartItems += item.quantity;
  });
  return (
    <div className='cart-items'>
      <p>{cartItems == 0 ? '' : cartItems}</p>
    </div>
  );
}

export default Header;
