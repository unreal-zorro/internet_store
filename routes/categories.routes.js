const {Router} = require('express')
const router = Router()
const {body, validationResult} = require('express-validator')
const Category = require('../models/Category')
const auth = require('../middleware/auth.middleware')
const User = require("../models/User");

// /api/categories/create
router.post('/create',
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  body('title', 'Некорректный заголовок.').exists().trim(),
  body('name', 'Некорректное имя.').exists().trim(),
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при создании категории.'
        })
      }

      const adminId = req.user.userId
      const admin = await User.findOne({ name: 'admin' })

      if (adminId !== admin.id) {
        return res.status(400).json({message: 'Администратор не найден.'})
      }

      const { id, title, name } = req.body

      const candidateWithLikeName = await Category.findOne({ name })
      if (candidateWithLikeName) {
        return res.status(400).json({
          message: 'Категория с таким именем уже существует.'
        })
      }

      const candidateWithLikeTitle = await Category.findOne({ title })
      if (candidateWithLikeTitle) {
        return res.status(400).json({
          message: 'Категория с таким заголовком уже существует.'
        })
      }

      const candidateWithLikeId = await Category.findOne({ id })
      if (candidateWithLikeId) {
        return res.status(400).json({
          message: 'Категория с таким идентификатором уже существует.'
        })
      }

      const category = new Category({ id, title, name })
      await category.save()
      res.status(201).json({ message: 'Категория создана!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/categories/all
router.get('/all',
  async (req, res) => {
    try {
      const categories = await Category.find()

      if (categories.length === 0) {
        return res.status(400).json({
          categories: [],
          message: 'Категорий пока нет.'
        })
      }

      res.json({ categories, message: 'Категории загружены!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/categories/remove
router.delete('/remove',
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при удалении категории.'
        })
      }

      const adminId = req.user.userId
      const admin = await User.findOne({ name: 'admin' })

      if (adminId !== admin.id) {
        return res.status(400).json({message: 'Администратор не найден.'})
      }

      const { id } = req.body
      const category = await Category.findOne({ id })

      if (!category) {
        return res.status(400).json({
          message: 'Категория с таким идентификатором не найдена.'
        })
      }

      await category.remove()

      res.json({ message: `Категория удалена!` })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/categories/update
router.put('/update',
  body('currentId', 'Некорректный текущий идентификатор.').not().isEmpty().trim(),
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  body('title', 'Некорректный заголовок.').exists().trim(),
  body('name', 'Некорректное имя.').exists().trim(),
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при обновлении категории.'
        })
      }

      const adminId = req.user.userId
      const admin = await User.findOne({ name: 'admin' })

      if (adminId !== admin.id) {
        return res.status(400).json({message: 'Администратор не найден.'})
      }

      const { currentId, id, title, name } = req.body
      const category = await Category.findOne({ id: currentId })

      if (!category) {
        return res.status(400).json({
          message: 'Категория с таким идентификатором не найдена.'
        })
      }

      if (category.name !== name) {
        const categoryWithLikeName = await Category.findOne({ name })
        if (categoryWithLikeName) {
          return res.status(400).json({
            message: 'Категория с таким именем уже существует.'
          })
        }
      }

      if (category.title !== title) {
        const categoryWithLikeTitle = await Category.findOne({ title })
        if (categoryWithLikeTitle) {
          return res.status(400).json({
            message: 'Категория с таким заголовком уже существует.'
          })
        }
      }

      if (category.id !== +id) {
        const categoryWithLikeId = await Category.findOne({ id })
        if (categoryWithLikeId) {
          return res.status(400).json({
            message: 'Категория с таким идентификатором уже существует.'
          })
        }
      }

      await Category.findByIdAndUpdate(category._id, { id, title, name })
      res.json({ message: 'Категория обновлена!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

module.exports = router
