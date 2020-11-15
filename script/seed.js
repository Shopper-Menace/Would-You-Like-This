'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')
const faker = require('faker')

const generateUsers = async () => {
  for (let i = 0; i < 50; i++) {
    let currentUser = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    currentUser.createOrder(Order)
  }
}

const generateProducts = async () => {
  for (let i = 0; i < 50; i++) {
    await Product.create({
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: faker.random.number(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.abstract()
    })
  }
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Creates 50 random users
  const users = await Promise.all([generateUsers()])
  // Creates Dummy Test user we can access
  const dummyUser = await User.create({
    email: 'Testsubject@gmail.com',
    password: '1234'
  })
  // Creates admin user we can access
  const admin = await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    isAdmin: true
  })

  admin.createOrder(Order)
  // Creates 50 dummy items
  const products = await Promise.all([generateProducts()])
  // Creates specific dummy item
  const newProduct = await Product.create({
    name: faker.commerce.productName(),
    category: faker.commerce.department(),
    price: faker.random.number(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.abstract()
  })
  // create test order in DB
  let testOrder = await dummyUser.createOrder(Order)

  // Associate Dummy Product with Dummy order as an Order Item
  // await OrderItem.create({
  //   orderId: testOrder.id,
  //   productId: newProduct.id,
  //   currentPrice: newProduct.price,
  //   quantity: 1
  // })

  await testOrder.addProduct(newProduct, {
    through: {
      currentPrice: newProduct.price,
      quantity: 1
    }
  })

  // Associate Dummy Product with Dummy order as an Order Item

  console.log(`seeded users`)
  console.log(`seeded products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
