const {Router} = require('express')
const router = Router()
const {body, validationResult} = require('express-validator')
const Good = require('../models/Good')
const Category = require('../models/Category')
const {Types} = require("mongoose");

// /api/goods/create
router.post('/create',
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  body('url', 'Некорректный url-адрес.').exists().trim(),
  body('name', 'Некорректное имя.').exists().trim(),
  body('descr', 'Некорректное описание.').exists().trim(),
  body('rating', 'Некорректный рейтинг.').exists().trim(),
  body('price', 'Некорректная цена.').exists().trim(),
  body('amount', 'Некорректное количество.').exists().trim(),
  body('categoryId', 'Категория не существует.').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при создании товара.'
        })
      }

      const { id, url, name, descr, rating, price, amount, categoryId } = req.body

      const candidateWithLikeId = await Good.findOne({ id })
      if (candidateWithLikeId) {
        return res.status(400).json({
          message: 'Товар с таким идентификатором уже существует.'
        })
      }

      const candidateWithLikeName = await Good.findOne({ name })
      if (candidateWithLikeName) {
        return res.status(400).json({
          message: 'Товар с таким именем уже существует.'
        })
      }

      const category = await Category.findOne({ id: categoryId })
      const good = new Good({ id, url, name, descr, rating, price, amount, categoryId: category._id })

      await good.save()

      res.status(201).json({ message: 'Товар создан!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/goods/category/:id
router.get('/category/:id',
  async (req, res) => {
    try {
      const categoryId = req.params.id
      const category = await Category.findOne({ id: categoryId })

      const goods = await Good.find({ categoryId: category._id })

      if (goods.length === 0) {
        return res.status(400).json({
          message: 'Товаров в данной категории пока нет.'
        })
      }

      res.json({ goods, message: 'Товары загружены!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/goods/all
router.get('/all',
  async (req, res) => {
    try {
      const goods = await Good.find()

      if (goods.length === 0) {
        return res.status(400).json({
          goods: [],
          message: 'Всех товаров пока нет.'
        })
      }

      res.json({ goods, message: 'Все товары загружены!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/goods/remove
router.delete('/remove',
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при удалении товара.'
        })
      }

      const { id } = req.body
      const good = await Good.findOne({ id })

      if (!good) {
        return res.status(400).json({
          message: 'Товар с таким идентификатором не найден.'
        })
      }

      await good.remove()

      res.json({ message: 'Товар удалён!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/goods/update
router.put('/update',
  body('currentId', 'Некорректный текущий идентификатор.').not().isEmpty().trim(),
  body('id', 'Некорректный идентификатор.').not().isEmpty().trim(),
  body('url', 'Некорректный url-адрес.').exists().trim(),
  body('name', 'Некорректное имя.').exists().trim(),
  body('descr', 'Некорректное описание.').exists().trim(),
  body('rating', 'Некорректный рейтинг.').exists().trim(),
  body('price', 'Некорректная цена.').exists().trim(),
  body('amount', 'Некорректное количество.').exists().trim(),
  body('categoryId', 'Категория не существует.').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при обновлении товара.'
        })
      }

      const { currentId, id, url, name, descr, rating, price, amount, categoryId } = req.body
      const good = await Good.findOne({ id: currentId })

      if (!good) {
        return res.status(400).json({
          message: 'Товар с таким идентификатором не найден.'
        })
      }

      if (good.id !== +id) {
        const goodWithLikeName = await Good.findOne({ id })
        if (goodWithLikeName) {
          return res.status(400).json({
            message: 'Товар с таким идентификатором уже существует.'
          })
        }
      }

      if (good.name !== name) {
        const goodWithLikeTitle = await Good.findOne({ name })
        if (goodWithLikeTitle) {
          return res.status(400).json({
            message: 'Товар с таким именем уже существует.'
          })
        }
      }

      await Good.findByIdAndUpdate( good._id, { id, url, name, descr, rating, price, amount, categoryId })
      res.json({ message: `Товар обновлён!` })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

module.exports = router
