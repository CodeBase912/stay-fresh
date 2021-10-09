// Import React and other useful libraries
import React, { useEffect } from 'react';
// Import React Components
import Product from './Product';
// Import Products
import { products } from '../products';
// Import Styles
import './ProductList.css';

// Define the Product type interface
interface Props {
  title: string;
}

// Define the ProductList React component
const ProductList: React.FC<Props> = ({ title }) => {
  function handleScroll(e: any) {
    if (e.target.classList.contains('on-scrollbar') === false) {
      e.target.classList.add('on-scrollbar');

      setTimeout(function () {
        e.target.classList.remove('on-scrollbar');
      }, 1000);
    }
  }

  useEffect(() => {
    const listOfProducts: HTMLElement | null =
      document.querySelector('.product-list');
    listOfProducts?.addEventListener('scroll', handleScroll, true);
    return () => {
      // cleanup
    };
  }, []);

  // Return the JSX element to render
  return (
    <>
      {/* Display the Shop page content */}
      <div className='product-list-wrapper'>
        <h2>
          {title}
          <div className='product-list-wrapper-btn-wrapper'>
            <button className='btn' id='order-now-btn'>
              See all
            </button>
          </div>
        </h2>
        <div className='product-list'>
          {products.map((product) => {
            return (
              <Product
                key={product.id}
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
};

export default ProductList;
