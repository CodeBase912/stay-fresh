import 'little-state-machine';

interface CartItems {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

declare module 'little-state-machine' {
  interface GlobalState {
    cartOpen: boolean;
    cartItems: CartItems[];
  }
}
