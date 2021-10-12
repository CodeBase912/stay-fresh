// Import React and other useful libraries
import React, { useContext } from 'react';
import { useStateMachine } from 'little-state-machine';
// Import Global State Actions
import { updateCartOpen, updateCartItems } from '../App';
// Import Products
import { products, trendingProducts } from '../products';
// Import Styles
import './Product.css';
import '../App.css';
// Import Images
import ProductImg1 from '../images/products/1.png';
import ProductImg2 from '../images/products/2.png';
import ProductImg3 from '../images/products/3.jpg';
import ProductImg4 from '../images/products/onions.jpg';
import ProductImg5 from '../images/products/broccoli.jpg';
import ProductImg6 from '../images/products/cucumber.jpg';

interface Image {
  img: string;
  src: string;
}

const images: Image[] = [
  { img: ProductImg1, src: '../../images/products/2.png' },
  { img: ProductImg2, src: '../../images/products/1.png' },
  { img: ProductImg3, src: '../../images/products/3.jpg' },
];

const trendingImages: Image[] = [
  { img: ProductImg4, src: '../../images/products/onions.jpg' },
  { img: ProductImg5, src: '../../images/products/broccoli.jpg' },
  { img: ProductImg6, src: '../../images/products/cucumber.jpg' },
];

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
}

// Define the prop type for the Product component
interface ProductProps {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
  description: string[];
  shadow?: boolean;
}

// Define the Product React component
const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  imgSrc,
  description,
  shadow,
}) => {
  // Define the global state and its actions
  const { actions, state } = useStateMachine({ updateCartItems });

  // Define the default value for the shadow prop
  if (typeof shadow === undefined) {
    shadow = true;
  }

  // Determine if the product is in the cart
  const productInCart = state.cartItems.find((item) => {
    if (item.id === id) {
      return true;
    }
  });

  // Determine the number of items of the product in cart
  const productItemsInCart = productInCart?.quantity;

  /**
   * Adds a product to the cart
   *
   * @param {number} id  the id of the product to be added to cart
   */
  function addToCart(id: number, event: any) {
    // Find the product to be added to the cart
    const product: Product | undefined =
      products.find((product: Product) => {
        if (product.id === id) {
          return true;
        }
      }) ||
      trendingProducts.find((product: Product) => {
        if (product.id === id) {
          return true;
        }
      });

    // If the product exists, add it to the cart
    if (product) actions.updateCartItems({ ...product, quantity: 1 });
  }

  // Determine which image to display with the product
  const img: Image | undefined =
    images.find((image: Image) => {
      if (image.src === imgSrc) {
        return true;
      }
    }) ||
    trendingImages.find((image: Image) => {
      if (image.src === imgSrc) {
        return true;
      }
    });

  // Define the description output variable
  let descriptionOutput: string = '';
  description.map((item) => {
    descriptionOutput += item + ', ';
  });

  descriptionOutput = descriptionOutput.slice(0, descriptionOutput.length - 2);

  // Return the JSX element to render
  return (
    <div className={shadow ? 'product shadow' : 'product'}>
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
        <p className='product-description'>
          {description.length > 0
            ? description.length == 1
              ? descriptionOutput.substr(0, 25)
              : descriptionOutput.substr(0, 25) + '...'
            : ''}
        </p>
        <p>R{price}.00</p>
        <div className='product-btn-wrapper'>
          <div className='items-in-cart-wrapper'>
            <p className='items-in-cart'>
              {productItemsInCart
                ? productItemsInCart == 1
                  ? productItemsInCart + ' item in cart'
                  : productItemsInCart + ' items in cart'
                : ''}
            </p>
          </div>
          <button
            className={
              productInCart
                ? 'btn add-to-cart-btn in-cart'
                : 'btn add-to-cart-btn'
            }
            id={'add-to-cart-' + id.toString()}
            onClick={(event) => {
              addToCart(id, event);
            }}
          >
            <svg
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 208.955 208.955'
              className='product-add-to-cart-icon'
            >
              <path
                d='M190.85,200.227L178.135,58.626c-0.347-3.867-3.588-6.829-7.47-6.829h-26.221V39.971c0-22.04-17.93-39.971-39.969-39.971
	C82.437,0,64.509,17.931,64.509,39.971v11.826H38.27c-3.882,0-7.123,2.962-7.47,6.829L18.035,200.784
	c-0.188,2.098,0.514,4.177,1.935,5.731s3.43,2.439,5.535,2.439h157.926c0.006,0,0.014,0,0.02,0c4.143,0,7.5-3.358,7.5-7.5
	C190.95,201.037,190.916,200.626,190.85,200.227z M79.509,39.971c0-13.769,11.2-24.971,24.967-24.971
	c13.768,0,24.969,11.202,24.969,24.971v11.826H79.509V39.971z M33.709,193.955L45.127,66.797h19.382v13.412
	c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5V66.797h49.936v13.412c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5
	V66.797h19.364l11.418,127.158H33.709z'
                fill={productInCart ? '#f57e2e' : '#ffffff'}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
