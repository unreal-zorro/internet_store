import React, {Component} from "react";

import {addOrder, cartClear} from "../../../redux/mainSlice";
import mainStore from "../../../redux/mainStore";
import cartCountAndAmount from "../../../utils/cartCountAndAmount";

import Ordering from "../../../components/Ordering/Ordering";
import Modal from "../../../components/Modal/Modal";
import Text from "../../../components/Text/Text";
import Promo from "../../../components/Promo/Promo";

class OrderingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery: "removal",
      payment: "cash",
      phone: "",
      comment: "",
      isOrdering: false,
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
    const currentOrder = {
      date: new Date().getTime(),
      number: (Math.random().toFixed(5)) * 100000,
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
    await this.setState(prevState => ({
      ...prevState,
      isOrdering: true
    }))
  }

  async modalClickHandler() {
    await this.setState(prevState => ({
      ...prevState,
      delivery: "removal",
      payment: "cash",
      phone: "",
      comment: "",
      isOrdering: false,
      currentOrder: {}
    }))
    mainStore.dispatch(cartClear())
    await this.setState(prevState => ({
      ...prevState,
      isOrdering: false
    }))
  }

  render() {
    const cart = mainStore.getState().main.cart
    const categories = mainStore.getState().categories.categories
    const {count, amount} = cartCountAndAmount(cart, categories)

    return (
      cart.length !== 0
        ? <React.Fragment>
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
            order={this.state.currentOrder.number}
            phone={this.state.currentOrder.orderingInfo.phone}
            onClick={this.modalClickHandler}
          />
        </React.Fragment>
        : <Promo>
          <Text text="Сначала добавьте товары в корзину." />
        </Promo>
    )
  }
}

export default OrderingPage
