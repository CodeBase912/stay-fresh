import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import './Header.css';
import cartIcon from '../../images/shopping-cart.png';

function Header() {
  const cartData = useContext(AppContext);
  function showCartHandler() {
    cartData.setCartOpen(!cartData.cartOpen);
  }

  function handleScroll(event) {
    const header = document.getElementById('header');
    if (window.scrollY >= 100) {
      header.style.transition = 'all 0.2s ease-in';
      header.style.background = 'white';
      header.style.color = 'black';
      header.style.boxShadow = '0px 2px 30px rgba(0, 0, 0, 0.404)';
    } else if (window.scrollY < 100) {
      header.style.transition = 'all 0.2s ease-in';
      header.style.background = 'transparent';
      header.style.color = 'white';
      header.style.boxShadow = 'unset';
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='header' id='header'>
      <div className='logo'>
        <h1>StayFresh</h1>
      </div>
      <div className='nav'>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
          <li className='cart-icon-wrapper' onClick={() => showCartHandler()}>
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
  useEffect(() => {}, [cartData.cart]);

  let cartItems = 0;
  cartData.cart.map((item) => {
    cartItems += item.quantity;
    return cartItems;
  });
  return (
    <div className='cart-items'>
      <p>{cartItems === 0 ? '' : cartItems}</p>
    </div>
  );
}

export default Header;
