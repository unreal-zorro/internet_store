import {useCallback, useEffect, useState} from "react";

const storageName = 'cartData'

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const cartInit = useCallback(initialCart => {
    setCart(initialCart)
    localStorage.setItem(storageName, JSON.stringify(initialCart))
  }, []);

  const cartAddNewGood = useCallback(newGood => {
    const newCart = cart.concat(newGood)
    setCart(newCart)
    localStorage.setItem(storageName, JSON.stringify(newCart))
  }, [cart]);

  const cartAddNewCount = useCallback((goodIndex, goodWithNewCount) => {
    const newCart = cart.slice()
    newCart[goodIndex] = goodWithNewCount
    setCart(newCart)
    localStorage.setItem(storageName, JSON.stringify(newCart))
  }, [cart]);

  const cartDeleteGood = useCallback(goodIndex => {
    const newCart = cart.slice()
    newCart.splice(goodIndex, 1)
    setCart(newCart)
    localStorage.setItem(storageName, JSON.stringify(newCart))
  }, [cart]);

  const cartClear = useCallback(() => {
    const newCart = []
    setCart(newCart)
    localStorage.removeItem(storageName)
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data) {
      setCart(data)
    }
  }, []);

  return { cart, cartInit, cartAddNewGood, cartAddNewCount, cartDeleteGood, cartClear }
}
