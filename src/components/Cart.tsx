import React, { useContext, useEffect } from 'react';
import { GlobalState, useStateMachine } from 'little-state-machine';
import { updateCartOpen, updateCartItems, removeCartItem } from '../App';
import { formatNumber } from '../Util/Util';
import closeIcon from '../images/close.png';
import deleteIcon from '../images/delete.png';
import plusIcon from '../images/plus.png';
import minusIcon from '../images/minus.png';
import ProductImg1 from '../images/products/1.png';
import ProductImg2 from '../images/products/2.png';
import ProductImg3 from '../images/products/3.jpg';
import '../App.css';
import './Cart.css';
import { CartItems } from '../global';

interface Image {
  img: string;
  src: string;
}

const images: Image[] = [
  { img: ProductImg1, src: '../../images/products/1.png' },
  { img: ProductImg2, src: '../../images/products/2.png' },
  { img: ProductImg3, src: '../../images/products/3.jpg' },
];

// Define the Cart component
const Cart: React.FC = () => {
  // Import the state variables and actions
  const { actions, state } = useStateMachine({
    updateCartItems,
    updateCartOpen,
    removeCartItem,
  });

  /**
   * Closes the cart
   */
  function closeCartHandler() {
    actions.updateCartOpen(false);
  }

  /**
   * Toggles the cart between opened and closed states
   *
   * @param {any} event  The click DOM event that triggers the togglecart
   *                     function
   */
  function toggleCart(event: any) {
    if (event.target?.getAttribute('class')?.split('-')[0] == 'btn') {
      // Do nothing
    } else if (event.target?.getAttribute('class')?.split('-')[0] == 'cart') {
      // Do nothing
    } else if (
      event.target?.getAttribute('class')?.split('-')[0] != 'cart' ||
      event.target?.getAttribute('class')?.split('-')[0] != 'btn'
    ) {
      // If the target does not have a class attribute 'cart' or 'btn'
      // toggle the cartOpen state
      actions.updateCartOpen(!state.cartOpen);
    }
  }

  // Add the click event listener to toggle the cart between open and close
  useEffect(() => {
    if (state.cartOpen == true) {
      document.body.addEventListener('click', toggleCart);
    }

    return () => document.body.removeEventListener('click', toggleCart);
  }, [state.cartOpen]);

  // Determine the cart total quantity and total price
  let totalCartQuantity: number = 0;
  let totalCartPrice: number = 0;
  state.cartItems.map((item) => {
    totalCartQuantity += item.quantity;
    totalCartPrice += item.price * item.quantity;
  });

  return (
    <div className='cart-wrapper'>
      {/* Display the close cart icon */}
      <div className='cart-close-icon-wrapper'>
        <img
          src={closeIcon}
          alt='Close cart icon'
          className='cart-close-icon'
          onClick={() => closeCartHandler()}
        />
      </div>

      {/* If cart is empty display 'cart is empty' message else
          display the cart header */}
      {state.cartItems.length == 0 ? (
        <p className='cart-empty-banner'>Cart is empty</p>
      ) : (
        <div className='cart-header'>
          <div className='cart-title-wrapper'>
            <p className='cart-title'>
              Cart
              <span className='cart-items-number'>
                ({formatNumber(totalCartQuantity)})
              </span>
            </p>
          </div>

          <div className='cart-total-wrapper'>
            <p className='cart-total-title'>Total</p>
            <p className='cart-total'>
              R<span>{formatNumber(totalCartPrice)}.00</span>
            </p>
          </div>
        </div>
      )}

      {/* Render a list of the cart items */}
      <div className='cart-products-wrapper'>
        {state.cartItems.map((item) => {
          const img: Image | undefined = images.find((image) => {
            if (image.src === item.imgSrc) {
              return true;
            }
          });
          return (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              imgSrc={img?.img}
              state={state}
              actions={actions}
            />
          );
        })}
      </div>
      {state.cartItems.length > 0 ? (
        <div className='cart-btn-wrapper'>
          <button className='btn' id='checkout-btn'>
            Checkout
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

// Define the prop type for the CartItem component
interface CartItemsProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgSrc: string | undefined; // Todo: Add default img if imgSrc is undefined
  state: GlobalState;
  actions: any;
}

// Define the CartItem component
const CartItem: React.FC<CartItemsProps> = ({
  id,
  name,
  price,
  quantity,
  imgSrc,
  state,
  actions,
}) => {
  /**
   * Increases the quantity of a cart item given the cart item id
   *
   * @param {number} cartItemId  the id of the cart item to increase
   */
  function IncreaseCartItemQuantity(cartItemId: number) {
    const cartItemIndexToIncrease = state.cartItems.findIndex(
      (item: CartItems) => {
        if (item.id === cartItemId) {
          return true;
        }
      }
    );

    actions.updateCartItems({
      id: cartItemId,
    });
  }

  /**
   * Decreases the quantity of a cart item given the cart item id
   *
   * @param {number} cartItemId  the id of the cart item to decrease
   */
  function DecreaseCartItemQuantity(cartItemId: number) {
    const cartItemIndexToDecrease = state.cartItems.findIndex((item) => {
      if (item.id === cartItemId) {
        return true;
      }
    });

    actions.updateCartItems({
      id: cartItemId,
      subtract: true,
    });
  }

  /**
   * Removes a cart item given the cart item id
   *
   * @param {number} cartItemId  the id of the cart item to remove
   */
  function removeCartItem(cartItemId: number) {
    actions.removeCartItem({
      id: cartItemId,
    });
  }

  return (
    <div className='cart-item'>
      {/* Display the delete cart item icon */}
      <div className='cart-item-delete-wrapper'>
        <img
          src={deleteIcon}
          alt='Delete cart item'
          className='cart-item-delete-icon'
          onClick={() => removeCartItem(id)}
        />
      </div>
      {/* Display cart item image */}
      <div className='cart-item-img-wrapper'>
        <img src={imgSrc} alt={name + ' image'} className='cart-item-img' />
      </div>
      {/* Display cart item details */}
      <div className='cart-item-details'>
        {/* Cart item name and price */}
        <p className='cart-item-name'>{name}</p>
        <p className='cart-item-price'>R{formatNumber(price)}.00</p>
        {/* Cart item quantity and quantity controls */}
        <div className='cart-item-quantity-wrapper'>
          <p className='cart-item-quantity-title'>Quantity</p>
          <div className='cart-item-quantity-detils-wrapper'>
            <img
              src={minusIcon}
              alt='Decrease quantity'
              onClick={() => DecreaseCartItemQuantity(id)}
              className='cart-item-change-quantity-icon'
            />
            <p className='cart-item-quantity'>{quantity}</p>
            <img
              src={plusIcon}
              alt='Increase quantity'
              onClick={() => IncreaseCartItemQuantity(id)}
              className='cart-item-change-quantity-icon'
            />
          </div>
        </div>
        {/* Cart item total price */}
        <div className='cart-item-total-price-wrapper'>
          <p className='cart-item-total-price'>
            R{formatNumber(price * quantity)}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
