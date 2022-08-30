const {Router} = require('express')
const router = Router()
const {body, validationResult} = require('express-validator')
const Category = require('../models/Category')

// /api/categories/create
router.post('/create',
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  body('title', 'Некорректный заголовок.').exists().trim(),
  body('name', 'Некорректное имя.').exists().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при создании категории.'
        })
      }

      const { id, title, name } = req.body
      const candidate = await Category.findOne({ id })

      if (candidate) {
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
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при удалении категории.'
        })
      }

      const { id } = req.body
      const category = await Category.findOne({ id })

      if (!category) {
        return res.status(400).json({
          message: 'Категория с таким идентификатором не найдена.'
        })
      }

      const name = category.name
      await category.remove()

      res.json({ message: `Категория ${name} удалена!` })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/categories/update
router.put('/update',
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  body('title', 'Некорректный заголовок.').exists().trim(),
  body('name', 'Некорректное имя.').exists().trim(),
  body('goods', 'Товары не существуют.').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при обновлении категории.'
        })
      }

      const { id, title, name, goods } = req.body
      const category = await Category.findOne({ id })

      if (!category) {
        return res.status(400).json({
          message: 'Категория с таким идентификатором не найдена.'
        })
      }

      category.update({ id, title, name, goods })

      res.json({ message: `Категория ${name} обновлена!` })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

module.exports = router
