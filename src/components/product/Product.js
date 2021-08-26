import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { products } from '../../products';
import ProductImg1 from '../../images/products/1.png';
import ProductImg2 from '../../images/products/2.png';
import ProductImg3 from '../../images/products/3.jpg';
import './Product.css';
import '../../App.css';

const images = [
  { img: ProductImg1, src: '../../images/products/1.png' },
  { img: ProductImg2, src: '../../images/products/2.png' },
  { img: ProductImg3, src: '../../images/products/3.jpg' },
];

function Product(props) {
  const { productId, name, price, imgSrc } = props;
  const cartData = useContext(AppContext);

  function addToCart(id) {
    const product = products.find((product) => {
      if (product.id === id) {
        return true;
      }
    });

    const index = cartData.cart.findIndex((item) => {
      if (item.id === productId) {
        return true;
      }
    });
    if (index < 0) {
      const arr = [...cartData.cart, { ...product, quantity: 1 }];
      cartData.setCart([...arr]);
    } else if (index >= 0) {
      const arr = cartData.cart;
      arr[index].quantity++;
      cartData.setCart([...arr]);
    } else {
      const arr = [...cartData.cart, product];
      cartData.setCart([...arr]);
    }
  }

  const img = images.find((image) => {
    if (image.src === imgSrc) {
      return true;
    }
  });

  return (
    <div className='product'>
      <div
        className='product-img-wrapper'
        style={{
          backgroundImage: `url(${img.img})`,
          backgroundSize: `cover`,
        }}
      >
        {/* <img src={imgSrc} alt='Product Image' className='product-img' /> */}
      </div>
      <div className='product-details'>
        <h4>{name}</h4>
        <p>R{price}.00</p>
        <div className='product-btn-wrapper'>
          <button
            className='btn'
            id={productId}
            onClick={() => {
              addToCart(productId);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
