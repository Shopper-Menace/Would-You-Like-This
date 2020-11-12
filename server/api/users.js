const router = require('express').Router()
const isLoggedIn = require('./middleware/isLoggedIn')
const isAdminUser = require('./middleware/isAdminUser')
const {User, Product, Order, OrderItem} = require('../db/models')

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
//this route may now be completely unnecessary, to view the user info when the user is logged, all of that data is already attatched to the user object

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      include: {
        model: Order,
        include: {
          model: Product
        }
        // where: {
        //   fulfillmentStatus: 'Cart',
        // },
      }
    })

    // const orderItems = await OrderItem.findAll({
    //   where: {
    //     order
    //   }
    // })

    // const orderItems = await OrderItem.findAll({
    //   where: {
    //     orderId: singleUser.
    //   }
    // })

    res.json(singleUser)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
