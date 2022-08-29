const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const {Types} = require("mongoose");

// /api/auth/register
router.post(
  '/register',
  body('name', 'Некорректное имя.').not().isEmpty().trim(),
  body('password', 'Введите пароль').exists().trim(),
  body('password', 'Минимальная длина пароля 6 символов.').isLength({ min: 6 }).trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации.'
        })
      }

      const {name, password, cart} = req.body
      const candidate = await User.findOne({ name })

      if (candidate) {
        return res.status(400).json({
          message: 'Пользователь с таким логином уже существует.'
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const newCart = cart.length === 0 ? [] : cart
      const user = new User({ name, password: hashedPassword, cart: newCart })

      await user.save()

      res.status(201).json({ message: 'Вы зарегистрированы.' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/auth/login
router.post(
  '/login',
  body('name', 'Введите корректное имя.').not().isEmpty().trim(),
  body('password', 'Введите пароль').exists().trim(),
  body('password', 'Минимальная длина пароля 6 символов.').isLength({ min: 6 }).trim(),
  body('cart', 'Корзина не существует.').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему.'
        })
      }

      const {name, password, cart} = req.body
      const user = await User.findOne({ name })

      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден.'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        if (name === 'admin') {
          return res.status(400).json({message: 'Неверный пароль администратора.'})
        } else {
          return res.status(400).json({message: 'Неверный пароль.'})
        }
      }

      let isAdmin = false
      let message = "Вы авторизованы."
      if (name === 'admin') {
        isAdmin = true
        message = "Вы авторизованы, администратор."
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      const userCart = user.cart.slice()

      const newCart = cart.length === 0
        ? userCart.length === 0
          ? []
          : userCart
        : userCart.length === 0
          ? cart
          : cart
            .map(item => {
              let userItem = {}
              let userIndex = -1
              if (userCart.find((item2, index) => {
                if (item2.id === item.id) {
                  userItem = item2
                  userIndex = index
                  return true
                } else {
                  return false
                }
              })) {
                userCart.splice(userIndex, 1)
                return {...item, count: item.count + userItem.count}
              } else {
                return item
              }
            })
            .concat(userCart)

      res.json({ token, userId: user.id, isAdmin, cart: newCart, message })

    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/auth/logout
router.post(
  '/logout',
  async (req, res) => {
    try {
      const {userId, cart: newCart} = req.body
      const id = new Types.ObjectId(userId)
      const length = newCart.length

      await User.updateOne({_id: id}, {
        $push: { cart: { $each: newCart, $position: 0, $slice: length } }
      })

      const user = await User.findById(userId)
      // (err, user) => {
        // if (err) {
        //   return
        // }
        // let message = "Вы вышли из системы."
        //
        // if (user.name === 'admin') {
        //   message = "Вы вышли из системы, администратор."
        // }
        //
        // res.json({ message })
      // })

      let message = "Вы вышли из системы."

      if (user.name === 'admin') {
        message = "Вы вышли из системы, администратор."
      }

      res.json({ message })

    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
  })

// /api/auth/order
router.post(
  '/order',
  async (req, res) => {
    try {
      const {userId, cart: newCart, order} = req.body
      const id = new Types.ObjectId(userId)

      const length = newCart.length

      await User.updateOne({_id: id}, {
        $push: {
          cart: { $each: newCart, $position: 0, $slice: length },
          orders: { ...order }
        }
      })

      const user = await User.findById(userId)
      // (err, user) => {
      //   if (err) {
      //     return
      //   }
      //   const ordersLength = user.orders.length
      //   const number = user.orders[ordersLength - 1].number
      //
      //   let message = `Ваш заказ № ${number} оформлен!`
      //
      //   if (user.name === 'admin') {
      //     message = `Ваш заказ № ${number} оформлен, администратор!`
      //   }
      //
      //   res.json({ message })
      // })

      const ordersLength = user.orders.length
      const number = user.orders[ordersLength - 1].number

      let message = `Ваш заказ № ${number} оформлен!`

      if (user.name === 'admin') {
        message = `Ваш заказ № ${number} оформлен, администратор!`
      }

      res.json({ message })

    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
  })

module.exports = router
