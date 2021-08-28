import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
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
  const cartData = useContext(AppContext);

  function showCartHandler() {
    cartData.setCartOpen(false);
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
      cartData.setCartOpen(!cartData.cartOpen);
    }
  }

  useEffect(() => {
    if (cartData.cartOpen == true) {
      document.body.addEventListener('click', toggleCart);
    }

    return () => document.body.removeEventListener('click', toggleCart);
  }, [cartData.cartOpen]);

  // Determine the cart total quantity and total price
  let cartItems = 0;
  let cartTotalPrice = 0;
  cartData.cart.map((item) => {
    cartItems += item.quantity;
    cartTotalPrice += item.quantity * item.price;
    return cartItems;
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
      {cartData.cart.length == 0 ? (
        <p className='cart-empty-banner'>Cart is empty</p>
      ) : (
        <div className='cart-header'>
          <div className='cart-title-wrapper'>
            <p className='cart-title'>
              Cart{' '}
              <span className='cart-items-number'>
                ({formatNumber(cartItems)})
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
              R<span>{formatNumber(cartTotalPrice)}</span>
              .00
            </p>
          </div>
        </div>
      )}

      <div className='cart-products-wrapper'>
        {cartData.cart.map((item) => {
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
              cart={cartData.cart}
              setCart={cartData.setCart}
            />
          );
        })}
      </div>
    </div>
  );
}

function CartItem({ id, name, price, quantity, imgSrc, cart, setCart }) {
  function IncreaseCartItemQuantity(cartItemId) {
    const cartItemIndexToIncrease = cart.findIndex((item) => {
      if (item.id === cartItemId) {
        return true;
      }
    });

    setCart(() => {
      if (cartItemIndexToIncrease < 0) {
        const arr = cart;
        arr[0].quantity++;
        setCart([...arr]);
      } else if (cartItemIndexToIncrease >= 0) {
        const arr = cart;
        arr[cartItemIndexToIncrease].quantity++;
        setCart([...arr]);
      }
    });
  }

  function DecreaseCartItemQuantity(cartItemId) {
    const cartItemIndexToDecrease = cart.findIndex((item) => {
      if (item.id === cartItemId) {
        return true;
      }
    });

    setCart(() => {
      if (cartItemIndexToDecrease < 0) {
        const arr = cart;
        if (arr[0].quantity == 1) {
          // Do nothing
        } else {
          arr[0].quantity--;
        }
        setCart([...arr]);
      } else if (cartItemIndexToDecrease >= 0) {
        const arr = cart;
        if (arr[cartItemIndexToDecrease].quantity == 1) {
          // Do nothing
        } else {
          arr[cartItemIndexToDecrease].quantity--;
        }
        setCart([...arr]);
      }
    });
  }

  function removeCartItem(cartItemId) {
    const cartItemIndexToRemove = cart.findIndex((item) => {
      if (item.id === cartItemId) {
        return true;
      }
    });

    let arr = cart;
    if (cartItemIndexToRemove == 0) {
      arr = arr.slice(cartItemIndexToRemove + 1, arr.length);
    } else if (cartItemIndexToRemove == arr.length) {
      arr = arr.slice(0, cartItemIndexToRemove - 1);
    } else {
      const LeftArr = arr.slice(0, cartItemIndexToRemove);
      const RightArr = arr.slice(cartItemIndexToRemove + 1, arr.length);
      arr = arr
        .slice(0, cartItemIndexToRemove)
        .concat(arr.slice(cartItemIndexToRemove + 1, arr.length));
    }

    setCart(arr);
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
