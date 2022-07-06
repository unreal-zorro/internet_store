import '../Cart.scss'

import {Link} from "react-router-dom";

function CartAuth () {
  return (
    <div className="cart__auth">
      <Link
        to="/auth"
        className="cart__link"
      >Войдите</Link>
      &nbsp;или&nbsp;
      <Link
        to="/register"
        className="cart__link"
      >зарегистрируйтесь</Link>
      , чтобы сделать заказ.
    </div>
  )
}

export default CartAuth
