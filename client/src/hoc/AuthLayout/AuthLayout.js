import React from "react";

import Container from "../../components/Container/Container";
import HomeLink from "../../components/HomeLink/HomeLink";
import Message from "../../components/Message/Message";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth.context";
import {CartContext} from "../../context/cart.context";
import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import declensionSymbols from "../../utils/declensionSymbols";

function AuthLayout(props) {
  const type = props.type
  const auth = useContext(AuthContext);
  const { cart, cartInit } = useContext(CartContext)
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
      let userCart = []

      if (type === 'register') {
        const data = await request('/api/auth/register', 'POST', {...form, cart})
        message(data.message)
      } else if (type === 'auth') {
        userCart = cart
      }

      const data = await request('/api/auth/login', 'POST', {...form, cart: userCart})
      auth.login(data.token, data.userId, data.isAdmin)
      cartInit(data.cart)
      message(data.message)
      navigate('/')
    } catch (e) {}
  }

  const ourProps = {
    children: 'example JSX element',
    loading,
    type,
    nameError,
    passwordError,
    registerOrLoginHandler,
    inputNameChangeHandler,
    inputPasswordChangeHandler
  }

  const newProps = Object.assign({}, ourProps);
  delete newProps.children;

  const children = React.cloneElement(props.children, newProps)

  return (
    <div>
      <Container>
        <HomeLink />

        {children}

      </Container>
      <Message />
    </div>
  )
}

export default AuthLayout
