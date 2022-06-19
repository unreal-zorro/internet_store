import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {addOrder, cartClear, orderingChange} from "../../../redux/mainSlice";
import cartCountAndAmount from "../../../utils/cartCountAndAmount";

import Ordering from "../../../components/Ordering/Ordering";
import Modal from "../../../components/Modal/Modal";

function OrderingPage() {
  const cart = useSelector(state => state.main.cart)
  const categories = useSelector(state => state.categories.categories)

  const {count, amount} = cartCountAndAmount(cart, categories)

  const ordering = useSelector(state => state.main.ordering)
  const dispatch = useDispatch()

  let isOrdering = useSelector(state => state.main.ordering.isOrdering)

  const orders = useSelector(state => state.main.orders)
  const orderNumber =  orders.length === 0
    ? orders[orders.length - 1].number
    : ''
  const orderPhone =  orders.length === 0
    ? orders[orders.length - 1].orderingInfo.phone
    : ''

  let currentOrder = {}

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
    dispatch(orderingChange({isOrdering: true}))
    currentOrder = {
      date: new Date().getTime(),
      number: (Math.random().toFixed(5)) * 100000,
      goods: cart,
      orderingInfo: {
        delivery: ordering.delivery,
        payment: ordering.payment,
        phone: ordering.phone,
        comment: ordering.comment
      }
    }
    dispatch(addOrder(currentOrder))
    dispatch(orderingChange({isOrdering: false}))
    dispatch(cartClear())
    dispatch(orderingChange({
      delivery: "removal",
      payment: "cash",
      phone: "",
      comment: "",
      isOrdering: false
    }))
  }

  return (
    <React.Fragment>
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
      <Modal
        className={isOrdering ? 'active' : ''}
        order={orderNumber}
        phone={orderPhone}
      />
    </React.Fragment>
  )
}

export default OrderingPage
