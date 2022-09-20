import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {addCategory, addGood} from "../../redux/categoriesSlice";
import {isOrderingChange} from "../../redux/mainSlice";
import cartCountAndAmount from "../../utils/cartCountAndAmount";
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
  const {count, amount} = cartCountAndAmount(cart, categories)
  const dispatch = useDispatch()
  const message = useMessage()
  const { request } = useHttp()

  useEffect(() => {
    async function fetchData(cart) {
      try {
        for (let goodInCart of cart) {
          const category = categories.find(item => +item.id === +goodInCart.categoryId)
          const dataGood = await request(`/api/goods/${category.title}/${goodInCart.id}`)
          const categoryIndex = categories.findIndex(item => item.id === category.id)

          const completeGood = {
            id: +dataGood.good.id,
            url: dataGood.good.url,
            name: dataGood.good.name,
            descr: dataGood.good.descr,
            rating: dataGood.good.rating,
            price: dataGood.good.price,
            amount: dataGood.good.amount,
            categoryId: dataGood.good.categoryId
          }

          await dispatch(addGood({ categoryIndex, completeGood }))
        }
      } catch (e) {}
    }

    if (cart.length) {
      fetchData(cart).then()
    }
  }, [cart, categories, dispatch, request])

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
      {
        count > 0
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
          : undefined
      }
    </Cart>
  )
}

export default CartPage
