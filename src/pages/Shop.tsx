import React from 'react';
import Header from '../components/Header';
import Product from '../components/Product';
import { products } from '../products';
import './MainContent.css';

interface ProductInterface {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
}

const Shop: React.FC = () => {
  return (
    <>
      <Header />
      <div className='main'>
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
      </div>
    </>
  );
};

export default Shop;
