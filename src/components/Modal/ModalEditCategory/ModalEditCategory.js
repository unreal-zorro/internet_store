import "../Modal.scss"
import {Link} from "react-router-dom";

function ModalEditCategory(props) {
  return (
    <form
      className="modal-form"
      onSubmit={props.onSubmit}
      onReset={props.onReset}
    >
      <div className="modal-form__row">
        <label className="modal-form__label modal-form__label-left" htmlFor="name">
          Имя категории:
        </label>
        <input
          className="modal-form__input"
          type="text"
          id="name"
          defaultValue={props.categoryName}
          onChange={props.onChangeCategoryName}
          required />
      </div>

      <div className="modal-form__row">
        <label className="modal-form__label modal-form__label-left" htmlFor="title">
          Заголовок категории:
        </label>
        <input
          className="modal-form__input"
          type="text"
          id="title"
          defaultValue={props.categoryTitle}
          onChange={props.onChangeCategoryTitle}
          required />
      </div>

      <div className="modal-form__row">
        <label className="modal-form__label modal-form__label-left" htmlFor="id">
          Идентификатор категории:
        </label>
        <input
          className="modal-form__input"
          type="text"
          id="id"
          defaultValue={props.categoryId}
          onChange={props.onChangeCategoryId}
          required />
      </div>

      <Link to="/">
        <button
          className="btn modal-form__btn"
          type="submit"
        >Готово</button>
        <button
          className="btn modal-form__btn"
          type="reset"
        >Отмена</button>
      </Link>
    </form>
  )
}

export default ModalEditCategory
