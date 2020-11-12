const router = require('express').Router()
const isLoggedIn = require('./middleware/isLoggedIn')
const isAdminUser = require('./middleware/isAdminUser')
const {User, Product, Order} = require('../db/models')

module.exports = router

//FIND USERS ROUTE
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//SINGLE USER ROUTE
router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      include: {model: Order}
    })

    res.json(singleUser)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
