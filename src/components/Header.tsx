import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateCartOpen, updateCartItems } from '../App';
import './Header.css';
import cartIcon from '../images/shopping-cart.png';

interface Props {
  scrollEffectEnabled?: boolean;
}

const Header: React.FC<Props> = (props) => {
  const { scrollEffectEnabled } = props;
  const { actions, state } = useStateMachine({
    updateCartItems,
    updateCartOpen,
  });

  function showCartHandler() {
    actions.updateCartOpen(!state.cartOpen);
  }

  function handleScroll(event: Event) {
    const header: HTMLElement | null = document.getElementById('header');
    const Links: NodeListOf<HTMLElement> =
      document.querySelectorAll('.header-link');
    if (window.scrollY >= 100) {
      if (header) {
        header.style.transition = 'all 0.2s ease-in';
        header.style.background = 'white';
        header.style.color = 'black';
        header.style.boxShadow = '0px 2px 30px rgba(0, 0, 0, 0.404)';
      }
      Array.from(Links).map((link) => {
        link.classList.add('black');
        link.classList.remove('white');
      });
    } else if (window.scrollY < 100) {
      if (header) {
        header.style.transition = 'all 0.2s ease-in';
        header.style.background = 'transparent';
        header.style.color = 'white';
        header.style.boxShadow = 'unset';
      }
      Array.from(Links).map((link) => {
        link.classList.add('white');
        link.classList.remove('black');
      });
    }
  }

  useEffect(() => {
    if (scrollEffectEnabled) {
      const header: HTMLElement | null = document.getElementById('header');
      const Links: NodeListOf<HTMLElement> =
        document.querySelectorAll('.header-link');
      if (window.scrollY >= 100) {
        if (header) {
          header.style.transition = 'all 0.2s ease-in';
          header.style.background = 'white';
          header.style.color = 'black';
          header.style.boxShadow = '0px 2px 30px rgba(0, 0, 0, 0.404)';
        }
        Array.from(Links).map((link) => {
          link.classList.add('black');
          link.classList.remove('white');
        });
      } else if (window.scrollY < 100) {
        if (header) {
          header.style.transition = 'all 0.2s ease-in';
          header.style.background = 'transparent';
          header.style.color = 'white';
          header.style.boxShadow = 'unset';
        }
        Array.from(Links).map((link) => {
          link.classList.add('white');
          link.classList.remove('black');
        });
      }

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      const header: HTMLElement | null = document.getElementById('header');
      const Links: NodeListOf<HTMLElement> =
        document.querySelectorAll('.header-link');
      if (header) {
        header.style.background = 'white';
        header.style.color = 'black';
        header.style.boxShadow = '0px 2px 30px rgba(0, 0, 0, 0.404)';
      }
      Array.from(Links).map((link) => {
        link.classList.add('black');
        link.classList.remove('white');
      });
    }
  }, []);

  return (
    <div className='header' id='header'>
      <div className='logo'>
        <h1>StayFresh</h1>
      </div>
      <div className='nav'>
        <ul>
          <li>
            <Link
              to='/'
              className={
                scrollEffectEnabled ? 'header-link white' : 'header-link black'
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/shop'
              className={
                scrollEffectEnabled ? 'header-link white' : 'header-link black'
              }
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to='/shop'
              className={
                scrollEffectEnabled ? 'header-link white' : 'header-link black'
              }
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to='/shop'
              className={
                scrollEffectEnabled ? 'header-link white' : 'header-link black'
              }
            >
              Contact
            </Link>
          </li>
          <li className='cart-icon-wrapper' onClick={() => showCartHandler()}>
            <img src={cartIcon} alt='Shopping cart' className='cart' />
            <CartItemsIndicator />
          </li>
        </ul>
      </div>
    </div>
  );
};

function CartItemsIndicator() {
  const { actions, state } = useStateMachine({
    updateCartItems,
    updateCartOpen,
  });

  let totalCartQuantity = 0;
  Array.from(state.cartItems).map((item) => {
    totalCartQuantity += item.quantity;
  });
  return (
    <div className='cart-items'>
      <p>{totalCartQuantity === 0 ? '' : totalCartQuantity}</p>
    </div>
  );
}

export default Header;
