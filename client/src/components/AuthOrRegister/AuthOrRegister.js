import './AuthOrRegister.scss'

import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {useHttp} from "../../hooks/http.hook";
import declensionSymbols from "../../utils/declensionSymbols";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/auth.context";

export const AuthOrRegister = (props) => {
  const type = props.type
  const auth = useContext(AuthContext);
  const message = useMessage()
  const navigate = useNavigate()

  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    name: '', password: ''
  });
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const passwordMinLength = 6

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  const inputNameChangeHandler = event => {
    const name = event.target.value

    if (name === '') {
      setNameError('Логин не может быть пустым.')
    } else {
      setNameError('')
      setForm({ ...form, [event.target.name]: [event.target.value] })
    }
  }

  const inputPasswordChangeHandler = (event) => {
    const password = event.target.value

    if (password === '') {
      setPasswordError('Пароль не может быть пустым.')
    } else if (
      password.length > 0 &&
      password.length < passwordMinLength
    ) {
      let passwordError = "Длина пароля должна быть не менее " +
        passwordMinLength +
        declensionSymbols(passwordMinLength, 'ов') +
        " Сейчас она равна " + password.length +
        declensionSymbols(password.length, 'ам')

      setPasswordError(passwordError)
    } else {
      setPasswordError('')
      setForm({ ...form, [event.target.name]: [event.target.value] })
    }
  }

  const registerOrLoginHandler = async event => {
    event.preventDefault()

    if (nameError || passwordError) {
      return undefined
    }

    try {
      if (type === 'register') {
        const data = await request('/api/auth/register', 'POST', {...form})
        message(data.message)
      }

      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId, data.isAdmin)
      message(data.message)
      navigate('/')
    } catch (e) {}
  }

  return (
    <div className="auth">
      <form
        className="auth-form"
        onSubmit={registerOrLoginHandler}
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
            onChange={inputNameChangeHandler}
          />
        </div>

        <div
          className="auth-form__row auth-form__error"
        > { nameError } </div>

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
            onChange={inputPasswordChangeHandler}
          />
        </div>

        <div
          className="auth-form__row auth-form__error"
        > { passwordError } </div>

        <button
          className="btn auth-form__btn"
          disabled={loading}
        >
          {type === 'auth'
            ? 'Войти'
            : type === 'register'
              ? 'Зарегистрироваться'
              : ''}
        </button>

        <div className="auth-form__link">
          или&nbsp;
          <Link
            to={type === 'auth'
              ? "/register"
              : type === 'register'
                ? "/auth"
                : "/"}
          >
            {type === 'auth'
              ? 'зарегистрироваться'
              : type === 'register'
                ? 'войти'
                : ''}
          </Link>
        </div>

      </form>
    </div>
  )
}
