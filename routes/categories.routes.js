const {Router} = require('express')
const router = Router()
const {body, validationResult} = require('express-validator')
const Category = require('../models/Category')

// /api/categories/categories
router.post('/categories',
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
          message: 'Некорректные данные при создании категории.'
        })
      }

      const { id, title, name, goods } = req.body
      const candidate = await Category.findOne({ id })

      if (candidate) {
        return res.status(400).json({
          message: 'Категория с таким идентификатором уже существует.'
        })
      }

      const newGoods = goods.length === 0 ? [] : goods
      const category = new Category({ id, title, name, goods: newGoods })

      await category.save()

      res.status(201).json({ message: 'Категория создана!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/categories/categories
router.get('/categories',
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  async (req, res) => {
    try {
      const categories = await Category.find()

      if (categories.length === 0) {
        return res.status(400).json({
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

// /api/categories/categories/:id
router.delete('/categories/:id',
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

// /api/categories/categories/:id
router.put('/categories/:id',
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
