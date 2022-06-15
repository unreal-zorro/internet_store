import '../Cart.scss'

import CartTotal from "../CartTotal/CartTotal";

function CartContent(props) {
  return (
    <div className={"cart__content " + props.className}>
      <div className="cart__cards">
        <div className="cart__header">
          <div className="cart__header_img">Фото</div>
          <div className="cart__header_info">Название</div>
          <div className="cart__header_count">Кол-во</div>
          <div className="cart__header_price">Цена</div>
        </div>

        {props.children}
      </div>

      <CartTotal
        count={props.count}
        amount={props.amount}
      />
    </div>
  )
}

export default CartContent
