import './Auth.scss'

import React from "react";
import {Link} from "react-router-dom";

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
            required
          />
        </div>

        <div
          className="auth-form__row"
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
            required
          />
        </div>

        <div
          className="auth-form__row"
        >
          {
            props.passwordError
              ? <React.Fragment>
                {"Пароль должен быть не менее " + props.passwordLength + "символов. Cейчас длина пароля равна " + props.password.length + "."}
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
