// Import React and other useful libraries
import React, { useEffect } from 'react';
// Import React Components
import Product from './Product';
// Import Styles
import './ProductList.css';

// Define the Product type interface
interface Props {
  title: string;
  products: {
    id: number;
    name: string;
    price: number;
    imgSrc: string;
    description: string[];
  }[];
  background?: string;
  shadow?: boolean;
  color?: string;
}

// Define the ProductList React component
const ProductList: React.FC<Props> = ({
  title,
  products,
  background,
  shadow,
  color,
}) => {
  function handleScroll(e: any) {
    if (e.target.classList.contains('on-scrollbar') === false) {
      e.target.classList.add('on-scrollbar');

      setTimeout(function () {
        e.target.classList.remove('on-scrollbar');
      }, 1000);
    }
  }

  useEffect(() => {
    const listOfProducts: NodeListOf<HTMLElement> =
      document.querySelectorAll('.product-list');
    Array.from(listOfProducts)?.map((list) => {
      list.addEventListener('scroll', handleScroll, true);
    });
    return () => {
      Array.from(listOfProducts)?.map((list) => {
        list.removeEventListener('scroll', handleScroll, true);
      });
    };
  }, []);

  // Return the JSX element to render
  return (
    <>
      {/* Display the Shop page content */}
      <div
        className='product-list-wrapper'
        style={background ? { backgroundColor: background } : {}}
      >
        <h2 style={color ? { color: color } : {}}>
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
                description={product.description}
                shadow={shadow}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
