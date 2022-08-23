import {useCallback, useEffect,
  // useRef,
  useState} from "react";

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
    setCart(cart.concat(newGood))

    localStorage.setItem(storageName, JSON.stringify(cart))
  }, [cart]);

  const cartAddNewCount = useCallback((goodIndex, goodWithNewCount) => {
    const newCart = cart.slice()
    newCart[goodIndex] = goodWithNewCount
    setCart(newCart)

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

  // const count = useRef(cart.reduce((sum, item) => sum + item.count, 0))

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data) {
      setCart(data)
    }
  }, []);

  return { cart, cartInit, cartAddNewGood, cartAddNewCount, cartDeleteGood, cartClear,
    // count
  }
}
