import {useDispatch, useSelector} from "react-redux";

import Ordering from "../../../components/Ordering/Ordering";
import {orderingChange} from "../../../redux/mainSlice";

function OrderingPage() {
  const cart = useSelector(state => state.main.cart)
  const categories = useSelector(state => state.categories.categories)

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

  const ordering = useSelector(state => state.main.ordering)
  const dispatch = useDispatch()

  function inputChangeDeliveryHandler(event) {
    const delivery = event.target.value
    dispatch(orderingChange({delivery}))
  }

  function inputChangePaymentHandler(event) {
    const payment = event.target.value
    dispatch(orderingChange({payment}))
  }

  function inputChangePhoneHandler(event) {
    const phone = event.target.value
    dispatch(orderingChange({phone}))
  }

  function inputChangeCommentHandler(event) {
    const comment = event.target.value
    dispatch(orderingChange({comment}))
  }

  function submitOrderingHandler(event) {
    event.preventDefault()
  }

  return (
    <Ordering
      count={count}
      amount={amount}
      deliveryValue={ordering.delivery}
      onChangeDelivery={inputChangeDeliveryHandler}
      paymentValue={ordering.payment}
      onChangePayment={inputChangePaymentHandler}
      phone={ordering.phone}
      onChangePhone={inputChangePhoneHandler}
      comment={ordering.comment}
      onChangeComment={inputChangeCommentHandler}
      onSubmit={submitOrderingHandler}
    />
  )
}

export default OrderingPage
