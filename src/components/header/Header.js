import React from 'react';
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
          <li>
            <img src={cartIcon} alt='Shopping cart' className='cart' />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
