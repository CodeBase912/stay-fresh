import React from 'react';
import Product from '../product/Product';
import { products } from '../../products';
import './MainContent.css';

function MainContent() {
  return (
    <div className='main'>
      <h2>Products</h2>
      <div className='product-list'>
        {products.map((product) => {
          return (
            <Product
              productId={product.id}
              name={product.name}
              price={product.price}
              imgSrc={product.imgSrc}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MainContent;
