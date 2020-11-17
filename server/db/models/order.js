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
  },
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.INTEGER
  },
  tel: {
    type: Sequelize.STRING
  },
  totalCost: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
