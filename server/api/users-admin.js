const router = require('express').Router()
const isAdminUser = require('./middleware/is-admin-user')
const {User, Product, Order, OrderItem} = require('../db/models')

module.exports = router

//FIND USERS ROUTE /api/users-admin
router.get('/', isAdminUser, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Order]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// FIND SINGLE USER ROUTE /api/users-admin/:userId
router.get('/:userId', isAdminUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [Order]
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// ADD SINGLE USER ROUTE /api/users-admin/

router.post('/', isAdminUser, async (req, res, next) => {
  try {
    const user = await User.create(req.body, {
      include: [Order]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// DELETE SINGLE USER ROUTE /api/users-admin/:userId

router.delete('/:userId', isAdminUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) return res.sendStatus(404)
    await user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// UPDATE SINGLE USER ROUTE /api/users-admin/:userId

router.put('/:userId', isAdminUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [Order]
    })
    if (!user) return res.sendStatus(404)
    const updatedUser = await user.update(req.body)
    res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
})
