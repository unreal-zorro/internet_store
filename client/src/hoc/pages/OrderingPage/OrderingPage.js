import React, {useContext, useState} from "react";

import {
  addOrder,
  currentOrderNumberChange,
  currentOrderPhoneChange,
  isOrderingChange
} from "../../../redux/mainSlice";
import mainStore from "../../../redux/mainStore";
import cartCountAndAmount from "../../../utils/cartCountAndAmount";

import Ordering from "../../../components/Ordering/Ordering";
import Modal from "../../../components/Modal/Modal";
import ModalOrdering from "../../../components/Modal/ModalOrdering/ModalOrdering";
import {CartContext} from "../../../context/cart.context";

function OrderingPage() {
  const [delivery, setDelivery] = useState("removal");
  const [payment, setPayment] = useState("cash");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const [isOrdering, setIsOrdering] = useState(
    (mainStore.getState().main.isOrdering &&
      mainStore.getState().main.cart.length === 0)
  );

  const [currentOrder, setCurrentOrder] = useState(
    {
      date: 0,
      number: 0,
      goods: [],
      orderingInfo: {
        delivery: '',
        payment: '',
        phone: '',
        comment: ''
      }
    }
  );

  const cartObject = useContext(CartContext);
  const cart = cartObject.cart
  const cartClear = cartObject.cartClear

  const categories = mainStore.getState().categories.categories
  const {count, amount} = cartCountAndAmount(cart, categories)

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

  function submitOrderingHandler(event) {
    event.preventDefault()

    if (cart.length === 0) {
      mainStore.dispatch(isOrderingChange(false))

      setDelivery("removal")
      setPayment("cash")
      setPhone("")
      setComment("")
      setIsOrdering(false)
      setCurrentOrder(null)

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

    setCurrentOrder(newCurrentOrder)

    mainStore.dispatch(addOrder(currentOrder))
    mainStore.dispatch(currentOrderNumberChange(currentOrder.number))
    mainStore.dispatch(currentOrderPhoneChange(currentOrder.orderingInfo.phone))

    cartClear()

    setDelivery("removal")
    setPayment("cash")
    setPhone("")
    setComment("")
    setCurrentOrder(null)
    setIsOrdering(true)
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



// class OrderingPage extends Component {
//   constructor(props) {
//     super(props);
    // this.state = {
      // delivery: "removal",
      // payment: "cash",
      // phone: "",
      // comment: "",
      // isOrdering:
      //   (mainStore.getState().main.isOrdering &&
      //   mainStore.getState().main.cart.length === 0),
      // currentOrder: {
      //   date: 0,
      //   number: 0,
      //   goods: [],
      //   orderingInfo: {
      //     delivery: '',
      //     payment: '',
      //     phone: '',
      //     comment: ''
      //   }
      // }
    // }
    // this.inputChangeDeliveryHandler = this.inputChangeDeliveryHandler.bind(this)
    // this.inputChangePaymentHandler = this.inputChangePaymentHandler.bind(this)
    // this.inputChangePhoneHandler = this.inputChangePhoneHandler.bind(this)
    // this.inputChangeCommentHandler = this.inputChangeCommentHandler.bind(this)
    // this.submitOrderingHandler = this.submitOrderingHandler.bind(this)
    // this.modalClickHandler = this.modalClickHandler.bind(this)
  // }

  // async inputChangeDeliveryHandler(event) {
  //   const delivery = event.target.value
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     delivery
  //   }))
  // }
  //
  // async inputChangePaymentHandler(event) {
  //   const payment = event.target.value
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     payment
  //   }))
  // }
  //
  // async inputChangePhoneHandler(event) {
  //   const phone = event.target.value
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     phone
  //   }))
  // }
  //
  // async inputChangeCommentHandler(event) {
  //   const comment = event.target.value
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     comment
  //   }))
  // }

  // async submitOrderingHandler(event) {
  //   event.preventDefault()
  //   const cart = mainStore.getState().main.cart
  //   if (cart.length === 0) {
  //     mainStore.dispatch(isOrderingChange(false))
  //     await this.setState(prevState => ({
  //       ...prevState,
  //       delivery: "removal",
  //       payment: "cash",
  //       phone: "",
  //       comment: "",
  //       isOrdering: false,
  //       currentOrder: {}
  //     }))
  //     return undefined
  //   }
  //   const currentOrder = {
  //     date: new Date().getTime(),
  //     number: Math.round((Math.random().toFixed(5) * 100000)),
  //     goods: cart,
  //     orderingInfo: {
  //       delivery: this.state.delivery,
  //       payment: this.state.payment,
  //       phone: this.state.phone,
  //       comment: this.state.comment
  //     }
  //   }
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     currentOrder
  //   }))
  //   mainStore.dispatch(addOrder(currentOrder))
  //   mainStore.dispatch(currentOrderNumberChange(currentOrder.number))
  //   mainStore.dispatch(currentOrderPhoneChange(currentOrder.orderingInfo.phone))
  //   mainStore.dispatch(cartClear())
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     delivery: "removal",
  //     payment: "cash",
  //     phone: "",
  //     comment: "",
  //     currentOrder: {}
  //   }))
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     isOrdering: true
  //   }))
  // }

  // async modalClickHandler() {
  //   await this.setState(prevState => ({
  //     ...prevState,
  //     isOrdering: false,
  //   }))
  //   mainStore.dispatch(isOrderingChange(false))
  //   mainStore.dispatch(currentOrderNumberChange(0))
  //   mainStore.dispatch(currentOrderPhoneChange(''))
  // }

//   render() {
//     const cart = mainStore.getState().main.cart
//     const categories = mainStore.getState().categories.categories
//     const {count, amount} = cartCountAndAmount(cart, categories)
//
//     return (
//       <React.Fragment>
//         <Ordering
//           count={count}
//           amount={amount}
//           deliveryValue={this.state.delivery}
//           onChangeDelivery={this.inputChangeDeliveryHandler}
//           paymentValue={this.state.payment}
//           onChangePayment={this.inputChangePaymentHandler}
//           phone={this.state.phone}
//           onChangePhone={this.inputChangePhoneHandler}
//           comment={this.state.comment}
//           onChangeComment={this.inputChangeCommentHandler}
//           onSubmit={this.submitOrderingHandler}
//         />
//         <Modal
//           className={this.state.isOrdering ? 'active' : ''}
//         >
//           <ModalOrdering
//             order={mainStore.getState().main.currentOrderNumber}
//             phone={mainStore.getState().main.currentOrderPhone}
//             onClick={this.modalClickHandler}
//           />
//         </Modal>
//       </React.Fragment>
//     )
//   }
// }

// export default OrderingPage
