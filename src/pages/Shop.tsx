// Import React and other useful libraries
import React from 'react';
// Import React Components
import Header from '../components/Header';
import Product from '../components/Product';
// Import Products
import { products } from '../products';
// Import Styles
import './MainContent.css';

// Define the Product type interface
interface ProductInterface {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
}

// Define the Shop React component
const Shop: React.FC = () => {
  // Return the JSX element to render
  return (
    <>
      {/* Display the Header component */}
      <Header />
      {/* Display the Shop page content */}
      <main className='main'>
        <h2>Products</h2>
        <div className='product-list'>
          {products.map((product: ProductInterface) => {
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
      </main>
    </>
  );
};

export default Shop;
