const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
      type: Sequelize.INTEGER,
      validate: {
          min: 0
      }
  }

})

module.exports = CartItem
