import {createContext} from "react";

function noop() {}

export const CartContext = createContext({
  cart: [],
  cartInit: noop,
  cartAddNewGood: noop,
  cartAddNewCount: noop,
  cartDeleteGood: noop,
  cartClear: noop,
  count: 0
})
