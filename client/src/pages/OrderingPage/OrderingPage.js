import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
  addMessage,
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
    useSelector(state => state.main.isOrdering) && cart.length === 0
  );

  const categories = useSelector(state => state.categories.categories)
  // const {count, amount} = cartCountAndAmount(cart, categories)

  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);

  const [goods, setGoods] = useState([]);

  const dispatch = useDispatch()
  const { userId, token } = useContext(AuthContext);
  const message = useMessage()
  const {request, error, clearError} = useHttp()

  useEffect(() => {
    async function fetchData(cart) {
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

          const calcCount = cart.reduce((sum, item) => sum + item.count, 0)
          const calcAmount = goods.reduce((sum, item) => sum + item.count * +(item.price), 0)
          setCount(calcCount)
          setAmount(calcAmount)
        } catch (e) {}
      }
    }

    if (cart.length && categories.length) {
      fetchData(cart).then()
    }
  }, [amount, cart, categories, count, dispatch, goods, request])

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
      dispatch(isOrderingChange(false))

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

      dispatch(addOrder(newCurrentOrder))
      dispatch(currentOrderNumberChange(newCurrentOrder.number))
      dispatch(currentOrderPhoneChange(newCurrentOrder.orderingInfo.phone))

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
          order={useSelector(state => state.main.currentOrderNumber)}
          phone={useSelector(state => state.main.currentOrderPhone)}
          onClick={modalClickHandler}
        />
      </Modal>
    </>
  )
}

export default OrderingPage
