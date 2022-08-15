const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register
router.post(
  '/register',
  body('name', 'Некорректное имя.').not().isEmpty().trim(),
  body('password', 'Введите пароль').exists().trim(),
  body('password', 'Минимальная длина пароля 6 символов.').isLength({ min: 6 }).trim(),
  async (req, res) => {
    try {
      console.log('Body: ', req.body)

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
          message: 'Пользователь с таким именем уже существует.'
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ name, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'Пользователь создан.' })

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
  body('password', 'Введите пароль').exists(),
  body('password', 'Минимальная длина пароля 6 символов.').isLength({ min: 6 }),
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
      const user = await user.findOne({name})

      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден.'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Неверный пароль.'})
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({token, userId: user.id})

    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

module.exports = router
