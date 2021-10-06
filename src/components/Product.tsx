import React, { useContext } from 'react';
import { useStateMachine } from 'little-state-machine';
import { updateCartOpen, updateCartItems } from '../App';
import { products } from '../products';
import ProductImg1 from '../images/products/1.png';
import ProductImg2 from '../images/products/2.png';
import ProductImg3 from '../images/products/3.jpg';
import './Product.css';
import '../App.css';

interface Image {
  img: string;
  src: string;
}

const images: Image[] = [
  { img: ProductImg1, src: '../../images/products/1.png' },
  { img: ProductImg2, src: '../../images/products/2.png' },
  { img: ProductImg3, src: '../../images/products/3.jpg' },
];

interface Product {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
}

const Product: React.FC<Product> = (props) => {
  const { id, name, price, imgSrc } = props;

  const { actions, state } = useStateMachine({ updateCartItems });

  let totalCartQuantity: number = 0;
  let totalCartPrice: number = 0;
  Array.from(state.cartItems).map((item) => {
    totalCartQuantity += item.quantity;
    totalCartPrice += item.price * item.quantity;
  });

  function addToCart(id: number) {
    const product: Product | undefined = products.find((product: Product) => {
      if (product.id === id) {
        return true;
      }
    });

    if (product) actions.updateCartItems({ ...product, quantity: 1 });
  }

  const img: Image | undefined = images.find((image: Image) => {
    if (image.src === imgSrc) {
      return true;
    }
  });

  return (
    <div className='product'>
      <div
        className='product-img-wrapper'
        style={{
          backgroundImage: `url(${img ? img.img : ''})`,
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
            id={id.toString()}
            onClick={() => {
              addToCart(id);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
