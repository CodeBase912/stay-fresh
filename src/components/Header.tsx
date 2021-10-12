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
import menuIcon from '../images/menu.png';

// Define the prop type for the Header React component
interface Props {
  scrollEffectEnabled?: boolean;
}

// Define the Header React component
const Header: React.FC<Props> = ({ scrollEffectEnabled }) => {
  let isMenuOpen: boolean = false;
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

  function showMenuHandler() {
    const nav: HTMLElement | null = document.querySelector('nav');

    console.log('Nav was clicked');
    if (isMenuOpen && nav) {
      nav.style.display = 'none';
      isMenuOpen = false;
    } else if (!isMenuOpen && nav) {
      if (window.innerWidth <= 650) {
        nav.style.display = 'flex';
        isMenuOpen = true;
      }
    }
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

  // let body: HTMLElement | null = document.querySelector('body');
  // let height: number | undefined = body?.clientHeight;
  useEffect(() => {
    // Display the header correctly
    handleHeaderDisplay();
    // Add the scroll event listener with the handleHeaderDisplay callback on the
    // window object
    window.addEventListener('scroll', handleHeaderDisplay);

    // window.addEventListener('scroll', () => {
    //   height = body?.getBoundingClientRect().height;
    // });
    return () => {
      window.removeEventListener('scroll', handleHeaderDisplay);
      // window.addEventListener('scroll', () => {
      //   height = body?.getBoundingClientRect().height;
      // });
    };
  }, []);

  // Return the JSX Element to render
  return (
    <div className='header' id='header'>
      {/* Display the logo */}
      <div className='logo'>
        <h1>StayFresh</h1>
      </div>
      {/* Display the nav */}
      <nav onClick={() => showMenuHandler()} className='nav'>
        <ul>
          <li>
            {/* Display the search bar */}
            <div className='header-search-bar'>
              <input
                type='text'
                name='search-input'
                id='search-input'
                placeholder='Search'
                className='header-search-input'
              />
              <div className='header-search-btn'>
                <svg
                  id='SvgjsSvg1001'
                  xmlns='http://www.w3.org/2000/svg'
                  version='1.1'
                  className='header-search-icon'
                >
                  <svg
                    id='SvgjsSvg1001'
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    viewBox='0 0 32 32'
                  >
                    <path
                      d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
                      fill='#ffffff'
                    ></path>
                  </svg>
                </svg>
              </div>
            </div>
          </li>
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
          <li
            id='desktop-cart-icon-wrapper'
            className='cart-icon-wrapper'
            onClick={() => showCartHandler()}
          >
            <img src={cartIcon} alt='Shopping cart' className='cart' />
            <CartItemsIndicator />
          </li>
        </ul>
      </nav>
      <div className='cart-icon-section'>
        <div className='cart-icon-wrapper' onClick={() => showCartHandler()}>
          <img src={cartIcon} alt='Shopping cart' className='cart' />
          <CartItemsIndicator />
        </div>
        <div className='cart-icon-wrapper' onClick={() => showMenuHandler()}>
          <img src={menuIcon} alt='Menu' className='menu-icon' />
        </div>
      </div>
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
