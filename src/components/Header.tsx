// Import React and other useful libraries
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
// Import Global State Actions
import { updateCartOpen, updateCartItems } from '../App';
// Import Syles
import './Header.css';
// Import Images
import cartIcon from '../images/shopping-cart.png';

// Define the prop type for the Header React component
interface Props {
  scrollEffectEnabled?: boolean;
}

// Define the Header React component
const Header: React.FC<Props> = ({ scrollEffectEnabled }) => {
  // Define the global state and its actions
  const { actions, state } = useStateMachine({
    updateCartItems,
    updateCartOpen,
  });

  /**
   * Toggles the cartOpen global state variable
   */
  function showCartHandler() {
    actions.updateCartOpen(!state.cartOpen);
  }

  /**
   * Changes the appearence of the Header React component when the user
   * scrolls down the page
   */
  function handleHeaderDisplay() {
    // Select the header and header Links HTML DOM elements
    const header: HTMLElement | null = document.getElementById('header');
    const Links: NodeListOf<HTMLElement> =
      document.querySelectorAll('.header-link');

    // Check if the scroll efect should be enabled
    if (scrollEffectEnabled === true) {
      // Scroll effect should be enabled
      // Check if the user has scrolled more than 100px down
      if (window.scrollY >= 100) {
        // User scrolled more than 100px down. Display the Header component
        // with a white background and black text
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
        // User scrolled less than 100px down. Display the Header component
        // with a transparent background and white text
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
    } else {
      // Scroll effect should not be enabled
      // Display the Header component
      // with a transparent background and white text
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
  }

  useEffect(() => {
    // Display the header correctly
    handleHeaderDisplay();
    // Add the scroll event listener with the handleHeaderDisplay callback on the
    // window object
    window.addEventListener('scroll', handleHeaderDisplay);
    return () => window.removeEventListener('scroll', handleHeaderDisplay);
  }, []);

  // Return the JSX Element to render
  return (
    <div className='header' id='header'>
      {/* Display the logo */}
      <div className='logo'>
        <h1>StayFresh</h1>
      </div>
      {/* Display the nav */}
      <nav className='nav'>
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
      </nav>
    </div>
  );
};

// Define the CartItemsIndicator React component
const CartItemsIndicator: React.FC = () => {
  // Define the global state
  const { state } = useStateMachine();

  // Determine the total cart quantity
  let totalCartQuantity: number = 0;
  state.cartItems.map((item) => {
    totalCartQuantity += item.quantity;
  });

  // Return the JSX Element to render
  return (
    <div className='cart-items'>
      <p>{totalCartQuantity === 0 ? '' : totalCartQuantity}</p>
    </div>
  );
};

export default Header;
