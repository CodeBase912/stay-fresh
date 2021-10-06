import React, { useContext, useEffect } from 'react';
import { useStateMachine } from 'little-state-machine';
import { updateCartOpen, updateCartItems, removeCartItem } from '../../App';
import { formatNumber } from '../../Util/Util';
import closeIcon from '../../images/close.png';
import deleteIcon from '../../images/delete.png';
import plusIcon from '../../images/plus.png';
import minusIcon from '../../images/minus.png';
import ProductImg1 from '../../images/products/1.png';
import ProductImg2 from '../../images/products/2.png';
import ProductImg3 from '../../images/products/3.jpg';
import '../../App.css';
import './Cart.css';

const images = [
  { img: ProductImg1, src: '../../images/products/1.png' },
  { img: ProductImg2, src: '../../images/products/2.png' },
  { img: ProductImg3, src: '../../images/products/3.jpg' },
];

function Cart() {
  const { actions, state } = useStateMachine({
    updateCartItems,
    updateCartOpen,
    removeCartItem,
  });

  function showCartHandler() {
    // cartData.setCartOpen(false);
    actions.updateCartOpen(false);
  }

  function toggleCart(event) {
    if (event.target?.getAttribute('class')?.split('-')[0] == 'btn') {
      // Do nothing
    } else if (event.target?.getAttribute('class')?.split('-')[0] == 'cart') {
      // Do nothing
    } else if (
      event.target?.getAttribute('class')?.split('-')[0] != 'cart' ||
      event.target?.getAttribute('class')?.split('-')[0] != 'btn'
    ) {
      // If the target does not have a class attribute 'cart' or 'btn' do the following
      // cartData.setCartOpen(!cartData.cartOpen);
      actions.updateCartOpen(!state.cartOpen);
    }
  }

  useEffect(() => {
    if (state.cartOpen == true) {
      document.body.addEventListener('click', toggleCart);
    }

    return () => document.body.removeEventListener('click', toggleCart);
  }, [state.cartOpen]);

  // Determine the cart total quantity and total price
  let totalCartQuantity = 0;
  let totalCartPrice = 0;
  Array.from(state.cartItems).map((item) => {
    totalCartQuantity += item.quantity;
    totalCartPrice += item.price * item.quantity;
  });

  return (
    <div className='cart-wrapper'>
      <div className='cart-close-icon-wrapper'>
        <img
          src={closeIcon}
          alt='Close cart icon'
          className='cart-close-icon'
          onClick={() => showCartHandler()}
        />
      </div>
      {state.cartItems.length == 0 ? (
        <p className='cart-empty-banner'>Cart is empty</p>
      ) : (
        <div className='cart-header'>
          <div className='cart-title-wrapper'>
            <p className='cart-title'>
              Cart{' '}
              <span className='cart-items-number'>
                ({formatNumber(totalCartQuantity)})
              </span>
            </p>
            <div className='btn-wrapper'>
              <button className='btn' id='checkout-btn'>
                Checkout
              </button>
            </div>
          </div>

          <div className='cart-total-wrapper'>
            <p className='cart-total-title'>Total</p>
            <p className='cart-total'>
              R<span>{formatNumber(totalCartPrice)}.00</span>
            </p>
          </div>
        </div>
      )}

      <div className='cart-products-wrapper'>
        {Array.from(state.cartItems).map((item) => {
          const img = images.find((image) => {
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
              imgSrc={img.img}
              state={state}
              actions={actions}
            />
          );
        })}
      </div>
    </div>
  );
}

function CartItem({ id, name, price, quantity, imgSrc, state, actions }) {
  function IncreaseCartItemQuantity(cartItemId) {
    const cartItemIndexToIncrease = Array.from(state.cartItems).findIndex(
      (item) => {
        if (item.id === cartItemId) {
          return true;
        }
      }
    );

    actions.updateCartItems({
      id: cartItemId,
    });
  }

  function DecreaseCartItemQuantity(cartItemId) {
    const cartItemIndexToDecrease = Array.from(state.cartItems).findIndex(
      (item) => {
        if (item.id === cartItemId) {
          return true;
        }
      }
    );

    actions.updateCartItems({
      id: cartItemId,
      subtract: true,
    });
  }

  function removeCartItem(cartItemId) {
    actions.removeCartItem({
      id: cartItemId,
    });
  }

  return (
    <div className='cart-item'>
      <div className='cart-item-delete-wrapper'>
        <img
          src={deleteIcon}
          alt='Delete cart item'
          className='cart-item-delete-icon'
          onClick={() => removeCartItem(id)}
        />
      </div>
      <div className='cart-item-img-wrapper'>
        <img src={imgSrc} alt={name + ' image'} className='cart-item-img' />
      </div>
      <div className='cart-item-details'>
        <p className='cart-item-name'>{name}</p>
        <p className='cart-item-price'>R{formatNumber(price)}.00</p>
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
        <div className='cart-item-total-price-wrapper'>
          <p className='cart-item-total-price'>
            R{formatNumber(price * quantity)}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
