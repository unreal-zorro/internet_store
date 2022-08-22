import '../Cart.scss'

// import mainStore from "../../../redux/mainStore";

import CartTotal from "../CartTotal/CartTotal";
import CartAuth from "../CartAuth/CartAuth";

function CartContent(props) {
  // const isAuth = mainStore.getState().main.isAuth
  // const isAdmin = mainStore.getState().main.isAdmin

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

      {
        (props.isAuth || props.isAdmin)
          ? <CartTotal
            count={props.count}
            amount={props.amount}
            onClick={props.onClick}
          />
          : <CartAuth />
      }
    </div>
  )
}

export default CartContent
