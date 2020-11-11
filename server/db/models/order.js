const {bool} = require('prop-types')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fulfillmentStatus: {
    type: Sequelize.ENUM('Cart', 'Pending', 'Complete'),
    defaultValue: 'Cart'
  }
})

module.exports = Order
