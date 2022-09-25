import {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {addMessage, isOrderingChange} from "../../redux/mainSlice";
import {AuthContext} from "../../context/auth.context";
import {CartContext} from "../../context/cart.context";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import CartEmpty from "../../components/Cart/CartEmpty/CartEmpty";
import CartContent from "../../components/Cart/CartContent/CartContent";
import CartCard from "../../components/Cart/CartCard/CartCard";
import Cart from "../../components/Cart/Cart";

function CartPage() {
  const auth = useContext(AuthContext);
  const isAuth = !!auth.token
  const isAdmin = auth.isAdmin
  const { cart, cartAddNewCount, cartDeleteGood } = useContext(CartContext)
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch()
  const message = useMessage()
  const { request, error, clearError } = useHttp()

  const [goods, setGoods] = useState([]);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  useEffect(() => {
    async function fetchData(cart) {
      const data = await request('api/goods/cart', 'POST', cart)
      setGoods(goods.concat(data.goods))
      await dispatch(addMessage(data.message))
    }

    if (cart.length > 0) {
      fetchData(cart).then()
    }
  }, [])

  useEffect(() => {
    const calcCount = goods.reduce((sum, item) => sum + item.count, 0)
    const calcAmount = goods.reduce((sum, item) => sum + item.count * +(item.price), 0)
    setCount(calcCount)
    setAmount(calcAmount)
  }, [goods]);

  function inputChangeHandler(value, id) {
    let goodIndex = -1

    const good = cart.find((item, index) => {
      if (item.id === id) {
        goodIndex = index
        return item
      } else {
        goodIndex = -1
        return undefined
      }
    })

    if (goodIndex === -1 || value < 0) {
      return
    }

    const goodInCartWithNewCount = {
      ...good,
      count: value
    }

    cartAddNewCount(goodIndex, goodInCartWithNewCount)

    const goodWithNewCount = {
      ...goods[goodIndex],
      count: value
    }
    const newGoods = [].concat(goods)
    newGoods.splice(goodIndex, 1, goodWithNewCount)
    setGoods(newGoods)
    message("Количество товаров изменено.")
  }

  function deleteButtonClickHandler(id) {
    const goodIndex = cart.findIndex((item) => item.id === id)
    cartDeleteGood(goodIndex)
    const newGoods = [].concat(goods)
    newGoods.splice(goodIndex, 1)
    setGoods(newGoods)
    message("Товар удалён из корзины.")
  }

  function cartOrderingClickHandler() {
    dispatch(isOrderingChange(true))
  }

  return (
    <Cart>
      <CartEmpty
        className={count > 0 ? "active" : ""}
      />
      {
        count && amount
          ? <CartContent
            className={count > 0
              ? (isAuth || isAdmin)
                ? "active"
                : "no_auth"
              : ""}
            count={count}
            amount={amount}
            isAuth={isAuth}
            isAdmin={isAdmin}
            onClick={cartOrderingClickHandler}
          >
            {goods.map(good =>
              (
                <CartCard
                  key={good.id}
                  url={good.url}
                  name={good.name}
                  categoryId={good.categoryId}
                  categoryTitle={good.categoryTitle}
                  id={good.id}
                  rating={good.rating}
                  count={good.count}
                  price={good.price}
                  onChange={(event) => {inputChangeHandler(+event.target.value, good.id)}}
                  onClick={() => {deleteButtonClickHandler(good.id)}}
                />
              )
            )}
          </CartContent>
          : undefined
      }
    </Cart>
  )
}

export default CartPage
