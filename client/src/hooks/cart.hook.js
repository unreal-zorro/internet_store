import {useCallback, useEffect, useState} from "react";

const storageName = 'cartData'

export const useCart = () => {
  const [cart, setCart] = useState([]);
  // const [count, setCount] = useState(
  //   cart.reduce((sum, item) => {
  //     return sum + item.count
  //   }, 0)
  // );

  const cartInit = useCallback(initialCart => {
    setCart(initialCart)

    localStorage.setItem(storageName, JSON.stringify(cart))
  }, [cart]);

  const cartAddNewGood = useCallback(newGood => {
    setCart(cart[cart.length] = newGood)

    localStorage.setItem(storageName, JSON.stringify(cart))
  }, [cart]);

  const cartAddNewCount = useCallback((goodIndex, goodWithNewCount) => {
    setCart(cart[goodIndex] = goodWithNewCount)

    localStorage.setItem(storageName, JSON.stringify(cart))
  }, [cart]);

  const cartDeleteGood = useCallback(goodIndex => {
    setCart(cart.splice(goodIndex, 1))

    localStorage.setItem(storageName, JSON.stringify(cart))
  }, [cart]);

  const cartClear = useCallback(() => {
    setCart(cart.splice(0, cart.length))

    localStorage.removeItem(storageName)
  }, [cart]);

  // const count = useCallback(() => {
  //   const cartArray = [].concat(cart)
  //
  //   const countInCart = cartArray.reduce((sum, item) => {
  //     return sum + item.count
  //   }, 0)
  //
  //   console.log("Count: ", countInCart)
  //
  //   return countInCart
  // }, [cart]);

  let count = 0

  useEffect(() => {
    if (cart.length !== 0) {
      count = cart.reduce((sum, item) => {
        return sum + item.count
      }, 0)
    }

    const data = JSON.parse(localStorage.getItem(storageName))

    if (data.length !== 0) {
      cartInit(data)
    }
  }, [cartInit]);

  return { cart, cartInit, cartAddNewGood, cartAddNewCount, cartDeleteGood, cartClear, count }
}
