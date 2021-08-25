import React from 'react';
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
  const { name, price, imgSrc } = props;

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
          <button className='btn'>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
