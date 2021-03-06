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

//ADD TO USER CART
router.put('/addItem/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const item = await Product.findByPk(req.body.itemId)

    await order.addProduct(item, {
      through: {currentPrice: item.price, quantity: 1}
    })

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

//REMOVE FROM USER CART
router.put('/removeItem/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const item = await Product.findByPk(req.body.itemId)

    await order.removeProduct(item)

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

//UPDATE USER ORDERS/CART FOR CHECKOUT
router.put('/cart/checkout', async (req, res, next) => {
  try {
    if (!req.user) {
      req.user = {id: 51}
    }
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        fulfillmentStatus: 'Cart'
      }
    })

    const name = `${req.body.firstName} ${req.body.lastName}`
    const address = `${req.body.address} ${req.body.aptNumber}`
    const {city, state, zip, tel, totalCost} = req.body

    await order.update({
      fulfillmentStatus: 'Pending',
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      tel: tel,
      totalCost: totalCost
    })

    const user = await User.findByPk(req.user.id)
    await user.createOrder(Order)

    console.log(user, 'USER')
    //make new order

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     const item = await OrderItem.findByPk(req.params.id)
//     const updatedItem = await item.update(req.body)
//     res.send(updatedItem)
//   } catch (err) {
//     console.error(err)
//   }
// })

//SINGLE USER ROUTE
//this route may now be completely unnecessary, to view the user info when the user is logged, all of that data is already attatched to the user object

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const singleUser = await User.findByPk(req.params.userId, {
//       include: {
//         model: Order,
//         include: {
//           model: Product
//         }
//         // where: {
//         //   fulfillmentStatus: 'Cart',
//         // },
//       }
//     })

//     // const orderItems = await OrderItem.findAll({
//     //   where: {
//     //     order
//     //   }
//     // })

//     // const orderItems = await OrderItem.findAll({
//     //   where: {
//     //     orderId: singleUser.
//     //   }
//     // })

//     res.json(singleUser)
//   } catch (err) {
//     console.error(err)
//     next(err)
//   }
// })
