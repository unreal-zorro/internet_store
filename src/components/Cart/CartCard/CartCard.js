import '../Cart.scss'

import {Link} from "react-router-dom";

function CartCard(props) {
  return (
    <div className="cart__card">
      <div className="cart-img">
        <Link to={"/catalog/" + props.categoryTitle + "/" + props.id}>
          <img src={props.url} alt="img" />
        </Link>
      </div>
      <div className="cart-info">

        <div className="cart-name">
          <Link to={"/catalog/" + props.categoryTitle + "/" + props.id}>
            {props.name}
          </Link>
        </div>
        <div className="cart-rating">Рейтинг: <span>{props.rating}</span></div>
        <div className="cart-id">ID: <span>{props.id}</span></div>
      </div>
      <div className="cart-count">
        <div className="cart-count__wrapper">
          <input
            className="cart__input"
            type="number"
            min="1"
            defaultValue={props.count}
            onChange={props.onChange}
          />
          <span>шт.</span>
        </div>
        <button
          className="btn btn-delete"
          onClick={props.onClick}
        >Удалить</button>
      </div>
      <div className="cart-price"><span>{props.price} руб.</span></div>
    </div>
  )
}

export default CartCard
