import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

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
  const categories = useSelector(state => state.categories.categories)
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch()
  const message = useMessage()
  const { request } = useHttp()

  const [goods, setGoods] = useState([]);

  useEffect(() => {
    async function fetchData(cart) {
      if (cart.length > 0) {
        for (let goodInCart of cart) {
          try {
            const category = categories.find(item => +item.id === +goodInCart.categoryId)
            const data = await request(`/api/goods/${category.title}/${goodInCart.id}`)

            if (!goods.find(item => item.id === data.good.id) && data.good.id === +goodInCart.id) {
              const completeGood = {
                id: +data.good.id,
                url: data.good.url,
                name: data.good.name,
                descr: data.good.descr,
                rating: data.good.rating,
                price: data.good.price,
                amount: data.good.amount,
                categoryId: data.good.categoryId,
                categoryTitle: category.title,
                count: goodInCart.count
              }

              setGoods(goods.concat(completeGood))
            }
          } catch (e) {}
        }

        try {
          await dispatch(addMessage("Товары загружены в корзину!"))

          const calcCount = goods.reduce((sum, item) => sum + item.count, 0)
          const calcAmount = goods.reduce((sum, item) => sum + item.count * +(item.price), 0)
          setCount(calcCount)
          setAmount(calcAmount)
        } catch (e) {}
      }
    }

    if (categories.length) {
      fetchData(cart).then()
    }
  }, [cart, categories, dispatch, goods, request])

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
    setGoods(goods.splice(goodIndex, 1, goodWithNewCount))
    message("Количество товаров изменено.")
  }

  function deleteButtonClickHandler(id) {
    const goodIndex = cart.findIndex((item) => item.id === id)
    cartDeleteGood(goodIndex)
    setGoods(goods.splice(goodIndex, 1))
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
