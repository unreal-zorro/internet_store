import {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";

import {isOrderingChange} from "../../redux/mainSlice";
import cartCountAndAmount from "../../utils/cartCountAndAmount";
import {AuthContext} from "../../context/auth.context";
import {CartContext} from "../../context/cart.context";
import {useMessage} from "../../hooks/message.hook";
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

    if (goodIndex === -1 || value < 0) {
      return
    }

    const goodWithNewCount = {
      ...good,
      count: value
    }

    cartAddNewCount(goodIndex, goodWithNewCount)
    message("Количество товаров изменено.")
  }

  function deleteButtonClickHandler(id) {
    const goodIndex = cart.findIndex((item) => item.id === id)
    cartDeleteGood(goodIndex)
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
