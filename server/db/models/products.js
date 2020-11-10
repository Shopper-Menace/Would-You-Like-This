const Sequelize = require('sequelize')
const models = require('.')
const { validate } = require('../db')
const db = require('../db')



const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    stock: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        }
    },
    manufacturer: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER
    }

})





module.exports = Product