import React, { useState } from 'react';
import Header from './components/header/Header';
import MainContent from './components/mainContent/MainContent';
import Cart from './components/cart/Cart';
import './App.css';

export const AppContext = React.createContext();
function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <AppContext.Provider value={{ cart, setCart, cartOpen, setCartOpen }}>
      <Header />
      {cartOpen === true ? <Cart /> : console.log('')}
      <MainContent />
    </AppContext.Provider>
  );
}

export default App;
