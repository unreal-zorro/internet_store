import '../Auth/Auth.scss'

import {Link} from "react-router-dom";

function Register(props) {
  return (
    <div className="auth">
      <form
        className="auth-form"
        onSubmit={props.onSubmit}
      >

        <div className="auth-form__row">
          <label
            htmlFor="login"
            className="auth-form__label"
          >Логин:</label>
          <input
            type="text"
            id="login"
            className="auth-form__input"
            value={props.login}
            required
          />
        </div>

        <div className="auth-form__row">
          <label
            htmlFor="password"
            className="auth-form__label"
          >Пароль:</label>
          <input
            type="text"
            id="password"
            className="auth-form__input"
            value={props.password}
            required
          />
        </div>

        <button
          className="btn auth-form__btn"
        >Зарегистрироваться</button>

        <div className="auth-form__link">
          или <Link to="/auth">войти</Link>
        </div>

      </form>
    </div>
  )
}

export default Register
