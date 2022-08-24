import {useDispatch, useSelector} from "react-redux";

import CartEmpty from "../../../components/Cart/CartEmpty/CartEmpty";
import CartContent from "../../../components/Cart/CartContent/CartContent";
import CartCard from "../../../components/Cart/CartCard/CartCard";
import Cart from "../../../components/Cart/Cart";
import {
  // addMessage,
  // cartAddNewCount,
  // cartDeleteGood,
  isOrderingChange
} from "../../../redux/mainSlice";
import cartCountAndAmount from "../../../utils/cartCountAndAmount";
import {useContext} from "react";
import {AuthContext} from "../../../context/auth.context";
import {CartContext} from "../../../context/cart.context";
import {useMessage} from "../../../hooks/message.hook";

function CartPage() {
  // const isAuth = useSelector(state => state.main.isAuth)
  // const isAdmin = useSelector(state => state.main.isAdmin)

  const auth = useContext(AuthContext);
  const isAuth = !!auth.token
  const isAdmin = auth.isAdmin

  // const cart = useSelector(state => state.main.cart)
  const { cart, cartAddNewCount, cartDeleteGood, cartClear } = useContext(CartContext)

  const categories = useSelector(state => state.categories.categories)

  const {count, amount} = cartCountAndAmount(cart, categories)

  const dispatch = useDispatch()

  const message = useMessage()

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

    if (goodIndex === -1) {
      return
    } else if (value < 0) {
      return
    }

    const goodWithNewCount = {
      ...good,
      count: value
    }

    // dispatch(cartAddNewCount({goodIndex, goodWithNewCount}))
    cartAddNewCount(goodIndex, goodWithNewCount)

    // dispatch(addMessage("Количество товаров изменено."))
    message("Количество товаров изменено.")
  }

  function deleteButtonClickHandler(id) {
    // dispatch(cartDeleteGood({goodIndex}))

    const goodIndex = cart.findIndex((item) => item.id === id)
    cartDeleteGood(goodIndex)

    // dispatch(addMessage("Товар удалён из корзины."))
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
      <CartContent
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
        {cart.map(item => {
          const category = categories.find(catItem =>
            catItem.id === item.categoryId
          )

          const good = category.goods.find(goodItem =>
            goodItem.id === item.id
          )

          return (
            <CartCard
              key={item.id}
              url={good.url}
              name={good.name}
              categoryId={category.id}
              categoryTitle={category.title}
              id={good.id}
              rating={good.rating}
              count={item.count}
              price={good.price}
              onChange={(event) => {inputChangeHandler(+event.target.value, item.id)}}
              onClick={() => {deleteButtonClickHandler(item.id)}}
            />
          )
        })}
      </CartContent>
    </Cart>
  )
}

export default CartPage
