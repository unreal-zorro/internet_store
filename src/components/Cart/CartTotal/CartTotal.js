import '../Cart.scss'

import {Link} from "react-router-dom";

function CartTotal(props) {
  return (
    <div className="cart__total">
      <div className="cart__text">Итого:</div>
      <div className="cart__goods">Товары: <span>{props.count} шт.</span></div>
      <div className="cart__amount">Сумма: <span>{props.amount} руб.</span></div>
      <Link to="/ordering">
        <button className="btn cart__btn">Оформить заказ</button>
      </Link>
    </div>
  )
}

export default CartTotal
