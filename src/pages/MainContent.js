import React from 'react';
import Header from '../header/Header';
import Product from '../product/Product';
import { products } from '../../products';
import './MainContent.css';

function MainContent() {
  return (
    <>
      <Header />
      <div className='main'>
        <h2>Products</h2>
        <div className='product-list'>
          {products.map((product) => {
            return (
              <Product
                id={product.id}
                name={product.name}
                price={product.price}
                imgSrc={product.imgSrc}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainContent;
