import React, {useContext, useEffect, useState} from "react";

import {
  addOrder,
  currentOrderNumberChange,
  currentOrderPhoneChange,
  isOrderingChange
} from "../../redux/mainSlice";
import mainStore from "../../redux/mainStore";
import {CartContext} from "../../context/cart.context";
import {AuthContext} from "../../context/auth.context";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import cartCountAndAmount from "../../utils/cartCountAndAmount";
import Ordering from "../../components/Ordering/Ordering";
import Modal from "../../components/Modal/Modal";
import ModalOrdering from "../../components/Modal/ModalOrdering/ModalOrdering";

function OrderingPage() {
  const [delivery, setDelivery] = useState("removal");
  const [payment, setPayment] = useState("cash");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const { cart, cartClear } = useContext(CartContext);

  const [isOrdering, setIsOrdering] = useState(
    (mainStore.getState().main.isOrdering && cart.length === 0)
  );

  const categories = mainStore.getState().categories.categories
  const {count, amount} = cartCountAndAmount(cart, categories)

  const { userId, token } = useContext(AuthContext);
  const message = useMessage()
  const {request, error, clearError} = useHttp()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  function inputChangeDeliveryHandler(event) {
    const delivery = event.target.value
    setDelivery(delivery)
  }

  function inputChangePaymentHandler(event) {
    const payment = event.target.value
    setPayment(payment)
  }

  function inputChangePhoneHandler(event) {
    const phone = event.target.value
    setPhone(phone)
  }

  function inputChangeCommentHandler(event) {
    const comment = event.target.value
    setComment(comment)
  }

  async function submitOrderingHandler(event) {
    event.preventDefault()

    if (cart.length === 0) {
      mainStore.dispatch(isOrderingChange(false))

      setDelivery("removal")
      setPayment("cash")
      setPhone("")
      setComment("")
      setIsOrdering(false)

      return undefined
    }
    const newCurrentOrder = {
      date: new Date().getTime(),
      number: Math.round((Math.random().toFixed(5) * 100000)),
      goods: cart,
      orderingInfo: {
        delivery,
        payment,
        phone,
        comment
      }
    }

    try {
      const data = await request('/api/auth/order', 'POST',
        {userId, cart: [], order: newCurrentOrder},
        {Authorization: `Bearer ${token}`})

      mainStore.dispatch(addOrder(newCurrentOrder))
      mainStore.dispatch(currentOrderNumberChange(newCurrentOrder.number))
      mainStore.dispatch(currentOrderPhoneChange(newCurrentOrder.orderingInfo.phone))

      cartClear()

      setDelivery("removal")
      setPayment("cash")
      setPhone("")
      setComment("")
      setIsOrdering(true)

      message(data.message)
    } catch (e) {}
  }

  function modalClickHandler() {
    setIsOrdering(false)
    mainStore.dispatch(isOrderingChange(false))
    mainStore.dispatch(currentOrderNumberChange(0))
    mainStore.dispatch(currentOrderPhoneChange(''))
  }

  return (
    <>
      <Ordering
        count={count}
        amount={amount}
        deliveryValue={delivery}
        onChangeDelivery={inputChangeDeliveryHandler}
        paymentValue={payment}
        onChangePayment={inputChangePaymentHandler}
        phone={phone}
        onChangePhone={inputChangePhoneHandler}
        comment={comment}
        onChangeComment={inputChangeCommentHandler}
        onSubmit={submitOrderingHandler}
      />
      <Modal
        className={isOrdering ? 'active' : ''}
      >
        <ModalOrdering
          order={mainStore.getState().main.currentOrderNumber}
          phone={mainStore.getState().main.currentOrderPhone}
          onClick={modalClickHandler}
        />
      </Modal>
    </>
  )
}

export default OrderingPage
