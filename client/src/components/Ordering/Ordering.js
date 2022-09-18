import './Ordering.scss'

function Ordering(props) {
  return (
    <form
      className="ordering"
      onSubmit={props.onSubmit}
    >
      <div className="ordering__total">
        <div className="ordering__text">Оформление заказа:</div>
        <div className="ordering__goods">Всего товаров: <span>{props.count} шт.</span></div>
        <div className="ordering__amount">На сумму: <span>{props.amount} руб.</span></div>
      </div>

      <div className="ordering-delivery">
        <label htmlFor="ordering-delivery" className="ordering-delivery__label">
          Выберите вариант доставки:
        </label>
        <select
          name="sort"
          id="ordering-delivery"
          className="ordering-delivery__select"
          defaultValue={props.deliveryValue}
          onChange={props.onChangeDelivery}
        >
          <option value="removal" className="ordering-delivery__item">Самовывоз</option>
          <option value="courier" className="ordering-delivery__item">Курьером</option>
          <option value="post" className="ordering-delivery__item">По почте</option>
          <option value="shipping" className="ordering-delivery__item">Транспортной компанией</option>
        </select>
      </div>

      <div className="ordering-payment">
        <label htmlFor="ordering-payment" className="ordering-payment__label">
          Выберите вариант оплаты:
        </label>
        <select
          name="sort"
          id="ordering-payment"
          className="ordering-payment__select"
          defaultValue={props.paymentValue}
          onChange={props.onChangePayment}
        >
          <option value="cash" className="ordering-payment__item">Наличными</option>
          <option value="courier" className="ordering-payment__item">Картой</option>
          <option value="payment_forward" className="ordering-payment__item">Наложенным платежом</option>
          <option value="bank_transfer" className="ordering-payment__item">Банковским переводом</option>
        </select>
      </div>

      <div className="ordering-phone">
        <label className="ordering-phone__label" htmlFor="phone">
          Укажите номер телефона:
        </label>
        <input
          className="ordering-phone__input"
          type="tel"
          id="phone"
          defaultValue={props.phone}
          onChange={props.onChangePhone}
          required />
      </div>

      <div className="ordering-comment">
        <label className="ordering-comment__label" htmlFor="comment">
          Введите комментарий к заказу (не обязательно):
        </label>
        <textarea
          className="ordering-comment__text"
          name="comment"
          id="comment"
          defaultValue={props.comment}
          onChange={props.onChangeComment}
        ></textarea>
      </div>

      <button className="btn ordering__btn">Сделать заказ</button>
    </form>
  )
}

export default Ordering
