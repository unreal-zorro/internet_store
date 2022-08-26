import './AuthOrRegister.scss'

import {Link} from "react-router-dom";

export const AuthOrRegister = (props) => {
  return (
    <div className="auth">
      <form
        className="auth-form"
        onSubmit={props.registerOrLoginHandler}
      >

        <div className="auth-form__row">
          <label
            htmlFor="name"
            className="auth-form__label"
          >Логин:</label>
          <input
            type="text"
            id="name"
            className="auth-form__input"
            placeholder="Введите логин"
            name="name"
            onChange={props.inputNameChangeHandler}
          />
        </div>

        <div
          className="auth-form__row auth-form__error"
        > { props.nameError } </div>

        <div className="auth-form__row">
          <label
            htmlFor="password"
            className="auth-form__label"
          >Пароль:</label>
          <input
            type="password"
            id="password"
            className="auth-form__input"
            placeholder="Введите пароль"
            name="password"
            onChange={props.inputPasswordChangeHandler}
          />
        </div>

        <div
          className="auth-form__row auth-form__error"
        > { props.passwordError } </div>

        <button
          className="btn auth-form__btn"
          disabled={props.loading}
        >
          {props.type === 'auth'
            ? 'Войти'
            : props.type === 'register'
              ? 'Зарегистрироваться'
              : ''}
        </button>

        <div className="auth-form__link">
          или&nbsp;
          <Link
            to={props.type === 'auth'
              ? "/register"
              : props.type === 'register'
                ? "/auth"
                : "/"}
          >
            {props.type === 'auth'
              ? 'зарегистрироваться'
              : props.type === 'register'
                ? 'войти'
                : ''}
          </Link>
        </div>

      </form>
    </div>
  )
}
