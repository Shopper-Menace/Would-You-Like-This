const router = require('express').Router()
const {Product, User} = require('../db/models')
const isLoggedIn = require('./middleware/isLoggedIn')
const isAdminUser = require('./middleware/isAdminUser')
module.exports = router

//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//GET SINGLE PRODUCT
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.status(200).json(product)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//ADD PRODUCT
router.post('/', isAdminUser, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//UPDATE PRODUCT ROUTE
router.put('/:productId', isAdminUser, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!product) return res.sendStatus(404)
    const updatedProduct = await product.update(req.body)
    res.status(200).json(updatedProduct)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//DELETE PRODUCT ROUTE
router.delete('/:productId', isAdminUser, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)

    if (!product) return res.sendStatus(404)
    await product.destroy()
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
