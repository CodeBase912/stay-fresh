import 'little-state-machine';

interface CartItems {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgSrc: string;
}

declare module 'little-state-machine' {
  interface GlobalState {
    cartOpen: boolean;
    cartItems: CartItems[];
  }
}
