import React from 'react';
import scrollIcon from '../../images/Scroll-down-icon.svg';
import '../../App.css';
import './HomePage.css';

function Hompage() {
  return (
    <div className='homepage'>
      <div className='hero-section'>
        <div className='hero-title-wrapper'>
          <h1>StayFresh</h1>
        </div>
        <div className='hero-intro-wrapper'>
          <p>
            StayFresh with the best Fresh fruits & vegetables delivered straight
            to your doorstep
          </p>
          <div className='btn-wrapper'>
            <button className='btn' id='order-now-btn'>
              Order now
            </button>
          </div>
        </div>
        <div className='scroll-btn-wrapper'>
          <img src={scrollIcon} alt='Scroll down' className='scrol-down-icon' />
        </div>
      </div>
    </div>
  );
}

export default Hompage;
