const router = require('express').Router()
module.exports = router
const isLoggedIn = require('./middleware/isLoggedIn')
const isAdminUser = require('./middleware/isAdminUser')

router.use('/users', require('./users'))
router.use('/products', require('./products'))

router.use(isLoggedIn)
router.use(isAdminUser)

router.use('/users-admin', require('./users-admin'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
