import './Auth.scss'

import React from "react";
import {Link} from "react-router-dom";
import declensionSymbols from "../../utils/declensionSymbols";

function Auth(props) {
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
            onChange={props.onChangeLogin}
            required
          />
        </div>

        <div
          className="auth-form__row auth-form__error"
        >
          {props.loginError}
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
            onChange={props.onChangePassword}
            required
          />
        </div>

        <div
          className="auth-form__row auth-form__error"
        >
          {
            props.passwordError
              ? <React.Fragment>
                {"Пароль должен быть не менее " +
                  props.passwordLength +
                  (+props.passwordLength === 1 ? " символа" : " символов") +
                  ". Сейчас длина пароля составляет " +
                  props.password.length +
                  declensionSymbols(props.password.length)}
              </React.Fragment>
              : undefined
          }
        </div>

        <button
          className="btn auth-form__btn"
        >Войти</button>

        <div className="auth-form__link">
          или <Link to="/register">зарегистрироваться</Link>
        </div>

      </form>
    </div>
  )
}

export default Auth
