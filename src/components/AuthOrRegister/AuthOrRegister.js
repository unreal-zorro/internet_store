import './AuthOrRegister.scss'

import {Component} from "react";
import {Link, useNavigate} from "react-router-dom";

import mainStore from "../../redux/mainStore";
import {addUser} from "../../redux/usersSlice";
import {addMessage, adminAuth, cartAddNewCount, cartAddNewGood, userAuth} from "../../redux/mainSlice";

import declensionSymbols from "../../utils/declensionSymbols";

const withRouter = WrapperComponent => props => {
  const navigate = useNavigate()
  return (
    <WrapperComponent
      {...props}
      navigate={navigate}
    />
  )
}

class AuthOrRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      login: '',
      loginError: '',
      password: '',
      passwordMinLength: 6,
      passwordError: ''
    }

    this.inputLoginChangeHandler = this.inputLoginChangeHandler.bind(this)
    this.inputPasswordChangeHandler = this.inputPasswordChangeHandler.bind(this)
    this.onSubmitClickHandler = this.onSubmitClickHandler.bind(this)
  }

  inputLoginChangeHandler (event) {
    const login = event.target.value
    let loginError = ''

    if (login === '') {
      loginError = "Логин не может быть пустым."
    }

    this.setState(prevState => ({
      ...prevState,
      login,
      loginError
    }))
  }

  inputPasswordChangeHandler (event) {
    const password = event.target.value
    let passwordError = ''

    if (password === '') {
      passwordError = "Пароль не может быть пустым."
    }

    if (
      password.length > 0 &&
      password.length < this.state.passwordMinLength
    ) {
      passwordError = "Длина пароля должна быть не менее " +
        this.state.passwordMinLength +
        declensionSymbols(this.state.passwordMinLength, 'ов') +
        " Сейчас она равна " + password.length +
        declensionSymbols(password.length, 'ам')
    }

    this.setState(prevState => ({
      ...prevState,
      password,
      passwordError
    }))
  }

  onSubmitClickHandler (event) {
    event.preventDefault()

    const loginError = this.state.loginError
    const passwordError = this.state.passwordError

    if (loginError || passwordError) {
      return undefined
    }

    const login = this.state.login
    const password = this.state.password

    const admin = mainStore.getState().users.admin
    const users = mainStore.getState().users.users
    const user = users.find(user => user.login === login)

    const cart = mainStore.getState().main.cart

    if (this.state.type === 'auth') {
      if (admin.login === login) {
        if (admin.password === password) {

          if (admin.cart.length !== 0) {
            admin.cart.forEach(item => {
              let goodIndex = 0
              const good = cart.find((cartGoodItem, cartGoodIndex) => {
                if(cartGoodItem.id === item.id) {
                  goodIndex = cartGoodIndex
                }
                return cartGoodItem.id === item.id
              })
              if (good) {
                const newCount = good.count + item.count
                const goodWithNewCount = {
                  ...good,
                  count: newCount
                }

                mainStore.dispatch(cartAddNewCount({
                  goodIndex: goodIndex,
                  goodWithNewCount
                }))
              } else {
                mainStore.dispatch(cartAddNewGood({
                  newGood: item
                }))
              }
            })
          }

          mainStore.dispatch(adminAuth(admin.login))
          mainStore.dispatch(addMessage("Вы авторизованы, администратор."))
          this.props.navigate("/")
        } else {
          this.setState(prevState => ({
            ...prevState,
            passwordError: 'Неверный пароль администратора.'
          }))
        }
      } else if (user) {
        if (user.password === password) {
          if (user.cart.length !== 0) {
            user.cart.forEach(item => {
              let goodIndex = 0
              const good = cart.find((cartGoodItem, cartGoodIndex) => {
                if(cartGoodItem.id === item.id) {
                  goodIndex = cartGoodIndex
                }
                return cartGoodItem.id === item.id
              })
              if (good) {
                const newCount = good.count + item.count
                const goodWithNewCount = {
                  ...good,
                  count: newCount
                }

                mainStore.dispatch(cartAddNewCount({
                  goodIndex: goodIndex,
                  goodWithNewCount
                }))
              } else {
                mainStore.dispatch(cartAddNewGood({
                  newGood: item
                }))
              }
            })
          }

          mainStore.dispatch(userAuth(user.login))
          mainStore.dispatch(addMessage("Вы авторизованы."))
          this.props.navigate("/")
        } else {
          this.setState(prevState => ({
            ...prevState,
            passwordError: 'Неверный пароль.'
          }))
        }
      } else {
        this.setState(prevState => ({
          ...prevState,
          loginError: 'Неверное имя пользователья.'
        }))
      }
    } else if (this.state.type === 'register') {
      if (admin.login === login || user) {
        this.setState(prevState => ({
          ...prevState,
          loginError: "Пользователь с таким логином уже существует."
        }))
        return undefined
      }

      const newUser = {
        login,
        password
      }

      mainStore.dispatch(addUser(newUser))
      mainStore.dispatch(userAuth(newUser.login))
      mainStore.dispatch(addMessage("Вы зарегистрированы."))
      this.props.navigate("/")
    }
  }

  render() {
    return (
      <div className="auth">
        <form
          className="auth-form"
          onSubmit={this.onSubmitClickHandler}
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
              value={this.state.login}
              onChange={this.inputLoginChangeHandler}
            />
          </div>

          <div
            className="auth-form__row auth-form__error"
          >
            {this.state.loginError}
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
              value={this.state.password}
              onChange={this.inputPasswordChangeHandler}
            />
          </div>

          <div
            className="auth-form__row auth-form__error"
          >
            {this.state.passwordError}
          </div>

          <button
            className="btn auth-form__btn"
          >
            {this.state.type === 'auth'
              ? 'Войти'
              : this.state.type === 'register'
                ? 'Зарегистрироваться'
                : ''}
          </button>

          <div className="auth-form__link">
            или&nbsp;
            <Link
              to={this.state.type === 'auth'
                ? "/register"
                : this.state.type === 'register'
                  ? "/auth"
                  : "/"}
            >
              {this.state.type === 'auth'
                ? 'зарегистрироваться'
                : this.state.type === 'register'
                  ? 'войти'
                  : ''}
            </Link>
          </div>

        </form>
      </div>
    )
  }
}

export default withRouter(AuthOrRegister)
