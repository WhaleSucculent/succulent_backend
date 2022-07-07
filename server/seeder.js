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
import Review from './models/Review.js';
import reviews from './data/reviews.js';
import Stock from './models/Stock.js';
import stocks from './data/stocks.js';
import Image from './models/Image.js';
import images from './data/images.js';



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
    await Customer.deleteMany();
    await Review.deleteMany();
    await Product.deleteMany();
    await Stock.deleteMany();
    await Image.deleteMany();

    

    const createAddresses = await Address.insertMany(addresses)
    const createCreditCard = await CreditCard.insertMany(creditCards);
    const createDelivery = await Delivery.insertMany(deliveries);
    const createPayment = await Payment.insertMany(payments);
    const createProductInCart = await ProductInCart.insertMany(productInCarts);

    
    const createImage = await Image.insertMany(images)
    const createProduct = await Product.insertMany(products);
    const createStock = await Stock.insertMany(stocks);
    const createOrder = await Order.insertMany(orders);
    const createCustomers = await Customer.insertMany(customers)
    const createReview = await Review.insertMany(reviews)


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
