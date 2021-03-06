const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  fulfillmentStatus: {
    type: Sequelize.ENUM('Cart', 'Pending', 'Complete'),
    defaultValue: 'Cart'
  },
  currentPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderItem
