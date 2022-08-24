const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const {Types} = require("mongoose");
const {ignoreRoot} = require("nodemon/lib/config/defaults");

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

      const {name, password} = req.body
      const candidate = await User.findOne({ name })

      if (candidate) {
        return res.status(400).json({
          message: 'Пользователь с таким логином уже существует.'
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ name, password: hashedPassword })

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
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему.'
        })
      }

      const {name, password} = req.body
      const user = await User.findOne({name})

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

      res.json({ token, userId: user.id, isAdmin, cart: user.cart, orders: user.orders, message })

    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/auth/logout
router.post(
  '/logout',
  // body('userId', 'Введите корректный идентификатор.').not().isEmpty().trim(),
  async (req, res) => {
    try {
      // const errors = validationResult(req)
      //
      // console.log("Errors: ", errors)
      //
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({
      //     errors: errors.array(),
      //     message: 'Некорректные данные при выходе из системы.'
      //   })
      // }

      const {userId, cart: newCart} = req.body
      const id = new Types.ObjectId(userId)
      const length = newCart.length
      console.log("length: ", length)

      // let newCart = await JSON.parse(cart)

      // console.log("NEW cart: ", newCart)

      const user = User.findById(id)
      console.log("user: ", user)

      await User.updateOne({_id: id}, {$push: {cart: {$each: newCart, $position:0, $slice:length}}})
        // , (err, result) => {
      //   if (err) {
      //     console.log("err: ", err.message)
      //     throw err
      //   }
      //   console.log("result: ", result)
      // })
      // const user = await User.findById(userId)
      // console.log("User: ", user)
      //
      // if (!user) {
      //   return res.status(400).json({message: 'Пользователь не найден.'})
      // }

      let message = "Вы вышли из системы."
      // if (name === 'admin') {
      //   message = "Вы вышли из системы, администратор."
      // }

      res.json({ message })

    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
  })

module.exports = router
