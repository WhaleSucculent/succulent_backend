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
import CreditCard from './models/CreditCard.js';
import creditCards from './data/creditCards.js';
import Delivery from './models/Delivery.js';
import deliveries from './data/deliveries.js';
import Payment from './models/Payment.js';
import payments from './data/payments.js';
import ProductInCart from './models/ProductInCart.js';
import productInCarts from './data/productInCarts.js';


dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Address.deleteMany();
    await CreditCard.deleteMany()
    await Delivery.deleteMany()
    await Payment.deleteMany();
    await ProductInCart.deleteMany();
    await Order.deleteMany();
    

    const createAddresses = await Address.insertMany(addresses)
    const createCreditCard = await CreditCard.insertMany(creditCards);
    const createDelivery = await Delivery.insertMany(deliveries);
    const createPayment = await Payment.insertMany(payments);
    const createProductInCart = await ProductInCart.insertMany(productInCarts);
    const createOrder = await Order.insertMany(orders);


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
