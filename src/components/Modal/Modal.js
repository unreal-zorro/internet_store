import './Modal.scss'

function Modal() {
  return (
    <div className="modal active">
      <div action="" className="modal-form">

        <div className="modal-form__row">
          <div className="modal-form__label">Поздравляем!</div>
        </div>

        <div className="modal-form__row">
          <div className="modal-form__label">Заказ № <span>123457890</span> успешно оформлен!</div>
        </div>

        <div className="modal-form__row">
          <div className="modal-form__label">При готовности заказа <br />на ваш номер телефона <span>+7-123-456-7890</span> <br />придёт SMS сообщение.</div>
        </div>

        <a href="./index.html">
          <button className="btn modal-form__btn">На главную</button>
        </a>
      </div>
    </div>
  )
}

export default Modal
