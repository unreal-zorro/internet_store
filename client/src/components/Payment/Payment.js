import './Payment.scss'

function Payment() {
  return (
    <div className="payment">
      <div className="payment__title">Варианты оплаты:</div>
      <ol className="payment__list">
        <li className="payment__item">Наличными</li>
        <li className="payment__item">Картой</li>
        <li className="payment__item">Наложенным платежом</li>
        <li className="payment__item">Банковским переводом</li>
      </ol>
    </div>
  )
}

export default Payment
