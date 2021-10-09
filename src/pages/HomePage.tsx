// Import React and other useful libraries
import React from 'react';
// Import React Components
import Header from '../components/Header';
import ProductList from '../components/ProductList';
// Import Styles
import '../App.css';
import './HomePage.css';
// Import Images
// import scrollIcon from '../images/Scroll-down-icon.svg';

// Define the Homepage React component
const HomePage: React.FC = () => {
  // Return the JSX Element to render
  return (
    <>
      {/* Display the Header component */}
      <Header />
      {/* Display the Hompage content */}
      <div className='homepage'>
        {/* Hero scetion */}
        <div className='hero-section-wrapper'>
          <div className='hero-section'>
            <div className='hero-content-wrapper'>
              <div className='hero-title-wrapper'>
                <h1>
                  Order your <span>Fresh</span>
                  <br />
                  fruits & veggies
                </h1>
              </div>
              <div className='hero-intro-wrapper'>
                <p>#Free Delivery</p>
                <div className='btn-wrapper'>
                  <button className='btn' id='order-now-btn'>
                    Order now
                  </button>
                </div>
              </div>
            </div>
            {/* <div className='scroll-btn-wrapper'>
            <img
              src={scrollIcon}
              alt='Scroll down'
              className='scroll-down-icon'
            />
          </div> */}
          </div>
        </div>

        {/* Services provided section */}
        <div className='services-section'>
          <ProductList title='Popular Products' />
        </div>
      </div>
    </>
  );
};

export default HomePage;
