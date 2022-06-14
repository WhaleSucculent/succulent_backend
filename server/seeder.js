import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
// import users from './data/users.js';
import connectDB from './config/db.js';
import addresses from './data/addresses.js';
import customers from './data/customers.js';
import orders from './data/orders.js';
import products from './data/products.js';
import Address from './models/Address.js';
import Product from './models/Product.js';
import Customer from './models/Customer.js';
import Order from './models/Order.js';


dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Address.deleteMany();
    await Customer.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createAddresses = await Address.insertMany(addresses)
    const createCustomers = await Customer.insertMany(customers);
    const createOrders = await Order.insertMany(orders);
    const createProducts = await Product.insertMany(products);

    // const adminUser = createdUsers[0]._id;

    // const sampleProducts = products.map((product) => {
    //   return { ...product, user: adminUser };
    // });

    // await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// const destroyData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     console.log('Data Destroyed!'.red.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
