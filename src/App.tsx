import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
  GlobalState,
} from 'little-state-machine';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import Cart from './components/Cart';
import './App.css';

createStore({
  cartOpen: false,
  cartItems: [],
});

interface Payload {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgSrc: string;
  subtract?: boolean;
}

export function updateCartItems(state: GlobalState, payload: Payload) {
  let index: number | undefined;
  const itemToUpdate = Array.from(state.cartItems).find((item, i) => {
    if (payload.id === item.id) {
      index = i;
      return true;
    }
  });

  if (typeof index === 'number' && index >= 0 && itemToUpdate) {
    let newCartItems = state.cartItems;
    // if (payload?.add) newCartItems[index].quantity++;
    if (payload?.subtract && newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
    } else if (!payload?.subtract) {
      newCartItems[index].quantity++;
    }
    return {
      ...state,
      cartItems: newCartItems,
    };
  } else {
    return {
      ...state,
      cartItems: [...state.cartItems, { ...payload }],
    };
  }
}

export function removeCartItem(state: GlobalState, payload: { id: number }) {
  let cartItemIndexToRemove: number | undefined;
  const itemToRemove = Array.from(state.cartItems).find((item, i) => {
    if (payload.id === item.id) {
      cartItemIndexToRemove = i;
      return true;
    }
  });

  let arr = Array.from(state.cartItems);
  if (cartItemIndexToRemove == 0) {
    arr = arr.slice(cartItemIndexToRemove + 1, arr.length);
  } else if (cartItemIndexToRemove == arr.length) {
    arr = arr.slice(0, cartItemIndexToRemove - 1);
  } else {
    if (cartItemIndexToRemove) {
      const LeftArr = arr.slice(0, cartItemIndexToRemove);
      const RightArr = arr.slice(cartItemIndexToRemove + 1, arr.length);
      arr = arr
        .slice(0, cartItemIndexToRemove)
        .concat(arr.slice(cartItemIndexToRemove + 1, arr.length));
    }
  }

  return {
    ...state,
    cartItems: arr,
  };
}

export function updateCartOpen(state: GlobalState, payload: boolean) {
  return {
    ...state,
    cartOpen: payload,
  };
}

const Application: React.FC = () => {
  const { actions, state } = useStateMachine({ updateCartItems });

  let totalCartQuantity: number = 0;
  let totalCartPrice: number = 0;
  Array.from(state.cartItems).map((item) => {
    totalCartQuantity += item.quantity;
    totalCartPrice += item.price * item.quantity;
  });

  return (
    <>
      {state.cartOpen === true ? <Cart /> : console.log('')}
      <Router>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={Shop} />
        {/* <Route exact path='/signup' component={Signup} /> */}
      </Router>
    </>
  );
};

const App: React.FC = () => {
  return (
    <StateMachineProvider>
      <Application />
    </StateMachineProvider>
  );
};

export default App;
