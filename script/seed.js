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

// const generateProducts = async () => {
//   for (let i = 0; i < 50; i++) {
//     await Product.create({
//       name: faker.commerce.productName(),
//       category: faker.commerce.department(),
//       price: faker.random.number(),
//       description: faker.commerce.productDescription(),
//       imageUrl: faker.image.abstract()
//     })
//   }
// }

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
  // const products = await Promise.all([generateProducts()])
  // Creates specific dummy item
  // const newProduct = await Product.create({
  //   name: faker.commerce.productName(),
  //   category: faker.commerce.department(),
  //   price: faker.random.number(),
  //   description: faker.commerce.productDescription(),
  //   imageUrl: faker.image.abstract()
  // })
  // create test order in DB
  // let testOrder = await dummyUser.createOrder(Order)

  // Associate Dummy Product with Dummy order as an Order Item
  // await OrderItem.create({
  //   orderId: testOrder.id,
  //   productId: newProduct.id,
  //   currentPrice: newProduct.price,
  //   quantity: 1
  // })

  // await testOrder.addProduct(newProduct, {
  //   through: {
  //     currentPrice: newProduct.price,
  //     quantity: 1
  //   }
  // })

  //Real Data: Luggage

  const silverLuggage = await Product.create({
    name: 'Large Silver Carry On',
    category: 'Luggage',
    price: 15000,
    description: 'Beautiful silver carry on, built to take a beating!',
    imageUrl:
      'https://shop.knopedia.com/wp-content/uploads/2019/08/Crash-luggage-Design-Solid-Zipper-Suitcase-TSA-Loc-Luggage-women-Travel-box-Men-ABS-Spinner-Italy.jpg'
  })

  const silverLuggage2 = await Product.create({
    name: 'Small Silver Carry On',
    category: 'Luggage',
    price: 10000,
    description: 'This one is just begging for a new owner!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5rKLSy-xhYsvbamCFDH_vFZZoW9V-GYvzQ&usqp=CAU'
  })

  const greyLuggage = await Product.create({
    name: 'Grey Carry On',
    category: 'Luggage',
    price: 12000,
    description: 'A few dings and scratches, but it still works fine!',
    imageUrl:
      'https://ae01.alicdn.com/kf/HTB19OM5mTqWBKNjSZFxq6ApLpXaX/Crash-luggage-Italy-Design-Broken-Zipper-Suitcase-TSA-Lock-Spinner-Luggage.jpg'
  })

  const redLuggage = await Product.create({
    name: 'Red Carry On',
    category: 'Luggage',
    price: 8000,
    description: 'We think the dents give it character, do you?',
    imageUrl: 'https://crashbaggage.com/1618-large_default/Array.jpg'
  })

  const tapeCarryOn = await Product.create({
    name: 'Taped Up Carry On',
    category: 'Luggage',
    price: 6000,
    description: 'With tape for extra security!',
    imageUrl: 'https://pbs.twimg.com/media/DeRjPIKVwAAXkRI.jpg'
  })

  const purpleCarryOn = await Product.create({
    name: 'Purple Carry On',
    category: 'Luggage',
    price: 7000,
    description:
      'Just a teeny tiny crack, but besides that it works perfectly!',
    imageUrl:
      'https://i2-prod.manchestereveningnews.co.uk/incoming/article15210111.ece/ALTERNATES/s615b/1_Travellers-share-more-broken-suitcases.jpg'
  })

  const greenCarryOn = await Product.create({
    name: 'Green Carry On',
    category: 'Luggage',
    price: 6000,
    description:
      'Just a few small cracks and dents, but besides that it works perfectly!',
    imageUrl:
      'https://milestomemories.com/wp-content/uploads/2020/02/broken-suitcase.jpg'
  })

  const forestGreenCarryOn = await Product.create({
    name: 'Forest Green Carry On',
    category: 'Luggage',
    price: 13000,
    description:
      'Beautiful forest green luggage! This one is in amazing condition!',
    imageUrl:
      'https://ae01.alicdn.com/kf/H0ea700a34f2f4996bc5579e17df9ac6dG/Personality-Damaged-Suitcase-Chaobai-Pull-rod-Suitcase-Student-Suitcase-Male-and-Female-Suitcases-20-24-28.jpg'
  })

  const blueCarryOn = await Product.create({
    name: 'Blue Carry On',
    category: 'Luggage',
    price: 13000,
    description: 'It may be missing some wheels, but you can still carry it!',
    imageUrl: 'https://pbs.twimg.com/media/EQNS8CyUcAI3VeY.jpg'
  })

  const smallTapeCarryOn = await Product.create({
    name: 'Small Taped Up Carry On',
    category: 'Luggage',
    price: 6000,
    description: 'With tape for extra security!',
    imageUrl:
      'https://static3.thetravelimages.com/wordpress/wp-content/uploads/2018/11/Pic-broken-luggage.jpg?q=50&fit=crop&w=740&h=493'
  })

  const maroonCarryOn = await Product.create({
    name: 'Maroon Carry On',
    category: 'Luggage',
    price: 7000,
    description: 'It may be missing some wheels, but you can still carry it!',
    imageUrl:
      'https://www.complaintsboard.com/thumb.php?src=compl_15042583469191.jpg&wmax=900&hmax=900&nocrop=true&complaints=910507&1504258346'
  })

  //Real Data: Championship Merch

  const bruinsTee = await Product.create({
    name: 'Bruins 2019 Stanley Cup Winners Tee',
    category: 'Championship Merch',
    price: 4000,
    description: 'Would have been pretty cool if they won, right?',
    imageUrl:
      'https://i.pinimg.com/originals/a9/96/cd/a996cd3b5508fe12baa44bd7cfb5a056.png'
  })

  const ramsTee = await Product.create({
    name: 'Rams 2019 SuperBowl Champions Long Sleeve',
    category: 'Championship Merch',
    price: 5000,
    description: 'Would have been pretty cool if they won, right?',
    imageUrl:
      'https://hutechtee.com/images/2019/06/Los-Angeles-Rams-2019-Super-Bowl-Champions-shirt-long-sleeved.jpg'
  })

  const fortyNinersTee = await Product.create({
    name: '49ers 2019 SuperBowl Champions Tee',
    category: 'Championship Merch',
    price: 5000,
    description: 'Would have been pretty cool if they won, right?',
    imageUrl:
      'https://cdn.gifteeshirt.com/limitededitionshirts/2020/02/Awesome-Super-Bowl-Champions-San-Francisco-49ers-2020-shirt_2-1.jpg'
  })

  const miamiHeatTee = await Product.create({
    name: 'Heat 2020 Champions Long Sleeve',
    category: 'Championship Merch',
    price: 4000,
    description: 'Would have been pretty cool if they won, right?',
    imageUrl:
      'https://i.etsystatic.com/23510734/r/il/9332b0/2549433682/il_1588xN.2549433682_qytu.jpg'
  })

  const houstonAstrosTee = await Product.create({
    name: 'Astros 2019 World Series Champions Tee',
    category: 'Championship Merch',
    price: 4000,
    description: 'Would have been pretty cool if they won, right?',
    imageUrl:
      'https://cdn.gifteeshirt.com/unicornshirts/2019/10/World-Series-2019-Houston-Astros-Champions-shirt-3.jpg'
  })

  const tampaBayTee = await Product.create({
    name: 'Devil Rays 2020 World Series Champions Tee',
    category: 'Championship Merch',
    price: 4000,
    description: 'Would have been pretty cool if they won, right?',
    imageUrl:
      'https://hottrendshirts.com/wp-content/uploads/2020/10/tampa-bay-rays-2020-world-series-champions-shirt-Shirt-%C4%91en.jpg'
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
