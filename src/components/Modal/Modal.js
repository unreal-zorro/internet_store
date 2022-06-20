import './Modal.scss'
import {Link} from "react-router-dom";

function Modal(props) {
  return (
    <div className={"modal " + props.className}>
      <div className="modal-form">

        <div className="modal-form__row">
          <div className="modal-form__label">Поздравляем!</div>
        </div>

        <div className="modal-form__row">
          <div className="modal-form__label">
            Заказ № <span>{props.order}</span> успешно оформлен!
          </div>
        </div>

        <div className="modal-form__row">
          <div className="modal-form__label">
            При готовности заказа <br />на ваш номер телефона
            <span> {props.phone}</span>
            <br />придёт SMS сообщение.
          </div>
        </div>

        <Link to="/">
          <button
            className="btn modal-form__btn"
            onClick={props.onClick}
          >На главную</button>
        </Link>
      </div>
    </div>
  )
}

export default Modal
