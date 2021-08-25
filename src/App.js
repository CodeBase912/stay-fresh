import React, { useState } from 'react';
import Header from './components/header/Header';
import MainContent from './components/mainContent/MainContent';
import './App.css';

export const AppContext = React.createContext();
function App() {
  const [cart, setCart] = useState([]);
  return (
    <AppContext.Provider value={{ cart, setCart }}>
      <Header />
      <MainContent />
    </AppContext.Provider>
  );
}

export default App;
