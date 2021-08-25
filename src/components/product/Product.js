import React from 'react';
import productImg from '../../images/products/1.png';
import './Product.css';
import '../../App.css';

function Product(props) {
  return (
    <div className='product'>
      <div
        className='product-img-wrapper'
        style={{
          backgroundImage: `url(${productImg})`,
          backgroundSize: `cover`,
        }}
      >
        {/* <img src={productImg} alt='Product Image' className='product-img' /> */}
      </div>
      <div className='product-details'>
        <h4>Sweet Home</h4>
        <p>R185.00</p>
        <div className='product-btn-wrapper'>
          <button className='btn'>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
