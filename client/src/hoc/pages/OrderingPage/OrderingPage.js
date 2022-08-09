import React, {Component} from "react";

import {
  addOrder,
  cartClear,
  currentOrderNumberChange,
  currentOrderPhoneChange,
  isOrderingChange
} from "../../../redux/mainSlice";
import mainStore from "../../../redux/mainStore";
import cartCountAndAmount from "../../../utils/cartCountAndAmount";

import Ordering from "../../../components/Ordering/Ordering";
import Modal from "../../../components/Modal/Modal";
import ModalOrdering from "../../../components/Modal/ModalOrdering/ModalOrdering";

class OrderingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery: "removal",
      payment: "cash",
      phone: "",
      comment: "",
      isOrdering:
        (mainStore.getState().main.isOrdering &&
        mainStore.getState().main.cart.length === 0),
      currentOrder: {
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
    }
    this.inputChangeDeliveryHandler = this.inputChangeDeliveryHandler.bind(this)
    this.inputChangePaymentHandler = this.inputChangePaymentHandler.bind(this)
    this.inputChangePhoneHandler = this.inputChangePhoneHandler.bind(this)
    this.inputChangeCommentHandler = this.inputChangeCommentHandler.bind(this)
    this.submitOrderingHandler = this.submitOrderingHandler.bind(this)
    this.modalClickHandler = this.modalClickHandler.bind(this)
  }

  async inputChangeDeliveryHandler(event) {
    const delivery = event.target.value
    await this.setState(prevState => ({
      ...prevState,
      delivery
    }))
  }

  async inputChangePaymentHandler(event) {
    const payment = event.target.value
    await this.setState(prevState => ({
      ...prevState,
      payment
    }))
  }

  async inputChangePhoneHandler(event) {
    const phone = event.target.value
    await this.setState(prevState => ({
      ...prevState,
      phone
    }))
  }

  async inputChangeCommentHandler(event) {
    const comment = event.target.value
    await this.setState(prevState => ({
      ...prevState,
      comment
    }))
  }

  async submitOrderingHandler(event) {
    event.preventDefault()
    const cart = mainStore.getState().main.cart
    if (cart.length === 0) {
      mainStore.dispatch(isOrderingChange(false))
      await this.setState(prevState => ({
        ...prevState,
        delivery: "removal",
        payment: "cash",
        phone: "",
        comment: "",
        isOrdering: false,
        currentOrder: {}
      }))
      return undefined
    }
    const currentOrder = {
      date: new Date().getTime(),
      number: Math.round((Math.random().toFixed(5) * 100000)),
      goods: cart,
      orderingInfo: {
        delivery: this.state.delivery,
        payment: this.state.payment,
        phone: this.state.phone,
        comment: this.state.comment
      }
    }
    await this.setState(prevState => ({
      ...prevState,
      currentOrder
    }))
    mainStore.dispatch(addOrder(currentOrder))
    mainStore.dispatch(currentOrderNumberChange(currentOrder.number))
    mainStore.dispatch(currentOrderPhoneChange(currentOrder.orderingInfo.phone))
    mainStore.dispatch(cartClear())
    await this.setState(prevState => ({
      ...prevState,
      delivery: "removal",
      payment: "cash",
      phone: "",
      comment: "",
      currentOrder: {}
    }))
    await this.setState(prevState => ({
      ...prevState,
      isOrdering: true
    }))
  }

  async modalClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      isOrdering: false,
    }))
    mainStore.dispatch(isOrderingChange(false))
    mainStore.dispatch(currentOrderNumberChange(0))
    mainStore.dispatch(currentOrderPhoneChange(''))
  }

  render() {
    const cart = mainStore.getState().main.cart
    const categories = mainStore.getState().categories.categories
    const {count, amount} = cartCountAndAmount(cart, categories)

    return (
      <React.Fragment>
        <Ordering
          count={count}
          amount={amount}
          deliveryValue={this.state.delivery}
          onChangeDelivery={this.inputChangeDeliveryHandler}
          paymentValue={this.state.payment}
          onChangePayment={this.inputChangePaymentHandler}
          phone={this.state.phone}
          onChangePhone={this.inputChangePhoneHandler}
          comment={this.state.comment}
          onChangeComment={this.inputChangeCommentHandler}
          onSubmit={this.submitOrderingHandler}
        />
        <Modal
          className={this.state.isOrdering ? 'active' : ''}
        >
          <ModalOrdering
            order={mainStore.getState().main.currentOrderNumber}
            phone={mainStore.getState().main.currentOrderPhone}
            onClick={this.modalClickHandler}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export default OrderingPage
