import React from 'react';
import Product from '../product/Product';
import './MainContent.css';

function MainContent() {
  return (
    <div className='main'>
      <h2>Products</h2>
      <Product />
    </div>
  );
}

export default MainContent;
