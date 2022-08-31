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
      const candidate = await Good.findOne({ id })

      if (candidate) {
        return res.status(400).json({
          message: 'Товар с таким идентификатором уже существует.'
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
          message: 'Товаров пока нет.'
        })
      }

      res.json({ goods, message: 'Товары загружены!' })
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

      const { id, url, name, descr, rating, price, amount, categoryId } = req.body
      const good = await Good.findOne({ id })

      if (!good) {
        return res.status(400).json({
          message: 'Товар с таким идентификатором не найден.'
        })
      }

      good.update({ id, url, name, descr, rating, price, amount, categoryId })

      res.json({ message: `Товар обновлён!` })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

module.exports = router
