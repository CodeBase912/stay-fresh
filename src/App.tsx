// Import React and other useful libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
  GlobalState,
} from 'little-state-machine';
// Import React Components
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import Cart from './components/Cart';
// Import Styles
import './App.css';

// Create the global state
createStore({
  cartOpen: false,
  cartItems: [],
});

// Define the payload type interface
interface Payload {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgSrc: string;
  subtract?: boolean;
}

/**
 * Updates the cartItems global state variable
 *
 * @param {GlobalState} state  the global state variable
 * @param {Payload} payload  the cart item to update
 * @returns {GlobalState}  the updated global state
 */
export function updateCartItems(state: GlobalState, payload: Payload) {
  // Declare the index of the cart item to update
  let index: number | undefined;
  // Find the cart item to update
  const itemToUpdate = state.cartItems.find((item, i) => {
    if (payload.id === item.id) {
      index = i;
      return true;
    }
  });

  // Check if whether to update a cart item or add a new item to cart
  if (typeof index === 'number' && index >= 0 && itemToUpdate) {
    // Cart item to update is defined/found. Update a cart item
    let newCartItems = state.cartItems;
    // Check if the update action is to add or subtract
    // the cart item quantity
    if (payload?.subtract && newCartItems[index].quantity > 1) {
      // Action is to subtract cart item quantity
      newCartItems[index].quantity--;
    } else if (!payload?.subtract) {
      /**
       * @comment Note that the if condition checks if the subtract key
       *          in the payload object is undefined. This is done to
       *          avoid the edge case where the cart item quantity is
       *          equal to 1, if this check is not done (if we just had an
       *          else statement instead of an else if), the cart item
       *          quantity will alternate between 1 and 2 when the user
       *          decreases the quantity. So the above if condition
       *          solves this issue
       *
       */

      // Action is to add cart item quantity
      newCartItems[index].quantity++;
    }
    // Return the updated state
    return {
      ...state,
      cartItems: newCartItems,
    };
  } else {
    // Add a new item to the cart
    // Return the updated state with the new cart item
    return {
      ...state,
      cartItems: [...state.cartItems, { ...payload }],
    };
  }
}

/**
 * Removes a cart item from the cartItems global state variable
 *
 * @param {GlobalState} state  the global state variable
 * @param {Object} payload  the cart item to update
 * @returns {GlobalState}  the updated global state
 */
export function removeCartItem(state: GlobalState, payload: { id: number }) {
  // Declare a variable that will store the index of the cart item to remove
  let cartItemIndexToRemove: number | undefined;
  // Find the cart item to remove
  const itemToRemove = state.cartItems.find((item, i) => {
    if (payload.id === item.id) {
      cartItemIndexToRemove = i;
      return true;
    }
  });

  // Define a temporary variable of the state. this will be used to update
  // the global state
  let arr = state.cartItems;
  // Check which item should be removed
  if (cartItemIndexToRemove == 0) {
    // Remove the first item in the cartItems array
    arr = arr.slice(cartItemIndexToRemove + 1, arr.length);
  } else if (cartItemIndexToRemove == arr.length) {
    // Remove the last item in the cart items array
    arr = arr.slice(0, cartItemIndexToRemove - 1);
  } else {
    // Item to remove is not the first or last cart item
    if (cartItemIndexToRemove) {
      // If the cartItemIndexToRemove is not undefined, remove the cartItem
      const LeftArr = arr.slice(0, cartItemIndexToRemove);
      const RightArr = arr.slice(cartItemIndexToRemove + 1, arr.length);
      arr = arr
        .slice(0, cartItemIndexToRemove)
        .concat(arr.slice(cartItemIndexToRemove + 1, arr.length));
    }
  }

  // Return the updated global state
  return {
    ...state,
    cartItems: arr,
  };
}

/**
 * Updates the cart open global state variable
 *
 * @param {GlobalState} state  the global state variable
 * @param {boolean} payload  the new cart open state value
 * @returns {GlobalState}  the updated global state
 */
export function updateCartOpen(state: GlobalState, payload: boolean) {
  // Return the updated global state
  return {
    ...state,
    cartOpen: payload,
  };
}

// Define the Application React component
const Application: React.FC = () => {
  // Define the global state varibale
  const { state } = useStateMachine();

  // Return the JSX Element to render
  return (
    <>
      {state.cartOpen === true ? <Cart /> : ''}
      <Router>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={Shop} />
      </Router>
    </>
  );
};

// Define the App React component
const App: React.FC = () => {
  // Return the JSX element to render
  return (
    <StateMachineProvider>
      <Application />
    </StateMachineProvider>
  );
};

export default App;
