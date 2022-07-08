import {Component} from "react";
import mainStore from "../../../redux/mainStore";

import declensionSymbols from "../../../utils/declensionSymbols";

import Auth from "../../../components/Auth/Auth";
import AuthLayout from "../../AuthLayout/AuthLayout";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    if (login === '') {
      this.setState(prevState => ({
        ...prevState,
          loginError: "Логин не может быть пустым."
      }))
      return undefined
    }

    const admin = mainStore.getState().users.admin
    const users = mainStore.getState().users.users

    if (
      admin.login === login ||
      users.find(user => user.login === login)
    ) {
      this.setState(prevState => ({
        ...prevState,
        loginError: "Пользователь с таким логином уже существует."
      }))
      return undefined
    }

    this.setState(prevState => ({
      ...prevState,
      login,
      loginError: ''
    }))
  }

  async inputPasswordChangeHandler (event) {
    const password = event.target.value

    if (password === '') {
      await this.setState(prevState => ({
        ...prevState,
        passwordError: "Пароль не может быть пустым."
      }))
      return undefined
    }

    if (password.length < this.state.passwordMinLength) {
      const passwordError = "Длина пароля должна быть не менее " +
        this.state.passwordMinLength +
        declensionSymbols(this.state.passwordMinLength, 'ов') +
        " Сейчас она равна " + password.length +
        declensionSymbols(password.length, 'ам')

      await this.setState(prevState => ({
        ...prevState,
        passwordError
      }))
      return undefined
    }

    await this.setState(prevState => ({
      ...prevState,
      password,
      passwordError: ''
    }))
  }

  onSubmitClickHandler (event) {
    event.preventDefault()

  }

  render() {
    return (
      <AuthLayout>
        <Auth
          login={this.state.login}
          loginError={this.state.loginError}
          password={this.state.password}
          passwordError={this.state.passwordError}
          passwordLength='6'
          onChangeLogin={this.inputLoginChangeHandler}
          onChangePassword={this.inputPasswordChangeHandler}
          onSubmit={this.onSubmitClickHandler}
        />
      </AuthLayout>
    )
  }
}

export default AuthPage
