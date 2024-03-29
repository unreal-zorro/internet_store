const {Router} = require('express')
const router = Router()
const {body, validationResult} = require('express-validator')
const Good = require('../models/Good')
const Category = require('../models/Category')
const auth = require('../middleware/auth.middleware')
const User = require("../models/User");

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
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при создании товара.'
        })
      }

      const adminId = req.user.userId
      const admin = await User.findOne({ name: 'admin' })

      if (adminId !== admin.id) {
        return res.status(400).json({message: 'Администратор не найден.'})
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

      if (!goods || goods.length === 0) {
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

// /api/goods/:categoryTitle/:id
router.get('/:categoryTitle/:id',
  async (req, res) => {
    try {
      const categoryTitle = req.params.categoryTitle
      const category = await Category.findOne({ title: categoryTitle })

      if (!category) {
        return res.status(400).json({
          message: 'Категории с таким заголовком не существует.'
        })
      }

      const goodId = req.params.id
      const good = await Good.findOne({ id: goodId })

      if (!good) {
        return res.status(400).json({
          message: 'Товара с таким идентификатором не существует.'
        })
      }

      const goods = await Good.find({ categoryId: category._id })

      if (!goods.find(item => item.id === good.id)) {
        return res.status(400).json({
          message: 'Товара с таким идентификатором в данной категории не существует.'
        })
      }

      res.json({ good, message: 'Товар загружен!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/goods/cart
router.post('/cart',
  async (req, res) => {
    try {
      const cart = req.body
      const goods = []

      if (cart.length) {
        for (let goodInCart of cart) {
          const categoryId = +goodInCart.categoryId
          const category = await Category.findOne({ id: categoryId })

          if (!category) {
            return res.status(400).json({
              message: 'Категории с таким идентификатором не существует.'
            })
          }

          const goodId = +goodInCart.id
          const good = await Good.findOne({ id: goodId })

          if (!good) {
            return res.status(400).json({
              message: 'Товара с таким идентификатором не существует.'
            })
          }
          const goodInCurrentCategory = await Good.find({ categoryId: category._id })

          if (!goodInCurrentCategory.find(item => item.id === good.id)) {
            return res.status(400).json({
              message: 'Товара с таким идентификатором в данной категории не существует.'
            })
          }

          goods.push({
            id: good.id,
            url: good.url,
            name: good.name,
            descr: good.descr,
            rating: good.rating,
            price: good.price,
            amount: good.amount,
            categoryTitle: category.title,
            categoryId: goodInCart.categoryId,
            count: goodInCart.count})
        }

        res.json({ goods, message: 'Товары из корзины загружены!' })
      }
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
  })

// /api/goods/all
router.get('/all',
  // auth,
  async (req, res) => {
    try {
      // const userId = req.user.userId

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
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при удалении товара.'
        })
      }

      const adminId = req.user.userId
      const admin = await User.findOne({ name: 'admin' })

      if (adminId !== admin.id) {
        return res.status(400).json({message: 'Администратор не найден.'})
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
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при обновлении товара.'
        })
      }

      const adminId = req.user.userId
      const admin = await User.findOne({ name: 'admin' })

      if (adminId !== admin.id) {
        return res.status(400).json({message: 'Администратор не найден.'})
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

      const newCategory = await Category.findOne({ id: categoryId })
      const newCategoryId = newCategory._id

      await Good.findByIdAndUpdate( good._id, { id, url, name, descr, rating, price, amount, categoryId: newCategoryId })
      res.json({ message: 'Товар обновлён!' })
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

// /api/goods/search
router.post('/search',
  body('searchValue', 'Некорректное выражение для поиска.').not().isEmpty().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при поиске товаров.'
        })
      }

      const { searchValue } = req.body
      const allGoods = await Good.find({})
      const regexp = new RegExp(`${searchValue}`, 'i')
      const goods = allGoods.filter(item => regexp.test(item.name))

      if (!goods) {
        return res.status(400).json({
          goods: [],
          message: 'Ничего не найдено.'
        })
      }

      if (goods.length) {
        res.json({ goods, message: 'Товары найдены!' })
      } else {
        res.json({ goods, message: 'Один товар найден!' })
      }
    } catch (e) {
      res.status(500).json({
        message: 'Что-то пошло не так, попробуйте снова.'
      })
    }
})

module.exports = router
