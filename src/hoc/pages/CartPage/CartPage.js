import categoriesStore from "../../../redux/categoriesStore";

import {useDispatch, useSelector} from "react-redux";

import CartEmpty from "../../../components/Cart/CartEmpty/CartEmpty";
import CartContent from "../../../components/Cart/CartContent/CartContent";
import CartCard from "../../../components/Cart/CartCard/CartCard";
import Cart from "../../../components/Cart/Cart";
import {cartAddNewCount, cartDeleteGood} from "../../../redux/mainSlice";

function CartPage() {
  const cart = useSelector(state => state.main.cart)
  const categories = categoriesStore.getState().categories

  let count = cart.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  let amount = cart.reduce((sum, item) => {
    let cat = categories.find((catItem) => {
      return catItem.id === item.categoryId
    })

    let good = cat.goods.find((goodItem) => {
      return goodItem.id === item.id
    })

    return sum + item.count * +(good.price)
  }, 0)

  const dispatch = useDispatch()

  function inputChangeHandler(value, id) {
    let goodIndex = -1
    let good = undefined

    good = cart.find((item, index) => {
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

    dispatch(cartAddNewCount({goodIndex, goodWithNewCount}))
  }

  function deleteButtonClickHandler(id) {
    let goodIndex = cart.findIndex((item) => item.id === id)

    dispatch(cartDeleteGood({goodIndex}))
  }

  return (
    <Cart>
      <CartEmpty
        className={count > 0 ? "active" : ""}
      />
      <CartContent
        className={count > 0 ? "active" : ""}
        count={count}
        amount={amount}
      >
        {cart.map((item, index, array) => {
          const category = categories.find((catItem, index, array) => {
            return catItem.id === item.categoryId
          })

          const good = category.goods.find((goodItem, index, array) => {
            return goodItem.id === item.id
          })

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
