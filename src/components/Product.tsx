// Import React and other useful libraries
import React, { useContext } from 'react';
import { useStateMachine } from 'little-state-machine';
// Import Global State Actions
import { updateCartOpen, updateCartItems } from '../App';
// Import Products
import { products } from '../products';
// Import Styles
import './Product.css';
import '../App.css';
// Import Images
import ProductImg1 from '../images/products/1.png';
import ProductImg2 from '../images/products/2.png';
import ProductImg3 from '../images/products/3.jpg';

interface Image {
  img: string;
  src: string;
}

const images: Image[] = [
  { img: ProductImg1, src: '../../images/products/1.png' },
  { img: ProductImg2, src: '../../images/products/2.png' },
  { img: ProductImg3, src: '../../images/products/3.jpg' },
];

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
}

// Define the Product React component
const Product: React.FC<Product> = ({ id, name, price, imgSrc }) => {
  // Define the global state and its actions
  const { actions, state } = useStateMachine({ updateCartItems });

  /**
   * Adds a product to the cart
   *
   * @param {number} id  the id of the product to be added to cart
   */
  function addToCart(id: number) {
    // Find the product to be added to the cart
    const product: Product | undefined = products.find((product: Product) => {
      if (product.id === id) {
        return true;
      }
    });

    // If the product exists, add it to the cart
    if (product) actions.updateCartItems({ ...product, quantity: 1 });
  }

  // Determine which image to display with the product
  const img: Image | undefined = images.find((image: Image) => {
    if (image.src === imgSrc) {
      return true;
    }
  });

  // Return the JSX element to render
  return (
    <div className='product'>
      {/* Display the image */}
      <div
        className='product-img-wrapper'
        style={{
          backgroundImage: `url(${img ? img.img : ''})`,
          backgroundSize: `cover`,
        }}
      ></div>
      {/* Display the product details */}
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
