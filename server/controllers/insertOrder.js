import mongoose from "mongoose";
import Delivery from '../models/Delivery.js';
import Order from '../models/Order.js';
import Address from '../models/Address.js';
import Payment from '../models/Payment.js';

//MongoDB transactions need MongoDB Instance to run with a Replica Set model, so Standalone MongoDB Instance doenot support transactions.

export const insertOrder = async (req, res) => {
    const order = new Order({
        customerId: mongoose.Types.ObjectId.isValid(req.body.customerId) ? req.body.customerId : new mongoose.Types.ObjectId(req.params.customerId),
        customerEmail: req.body.customerEmail,
        shippingAddressId: mongoose.Types.ObjectId.isValid(req.body.shippingAddressId) ? req.body.shippingAddressId : new mongoose.Types.ObjectId(req.params.shippingAddressId),
        billingAddressId: mongoose.Types.ObjectId.isValid(req.body.billingAddressId) ? req.body.billingAddressId : new mongoose.Types.ObjectId(req.params.billingAddressId),
        orderDate: req.body.orderDate,
        orderStatus: req.body.orderStatus,
        productsInCartIds: mongoose.Types.ObjectId.isValid(req.body.productsInCartIds) ? req.body.productsInCartIds : new mongoose.Types.ObjectId(req.params.productsInCartIds),
        deliveryId: mongoose.Types.ObjectId.isValid(req.body.deliveryId) ? req.body.deliveryId : new mongoose.Types.ObjectId(req.params.deliveryId),
        paymentId: mongoose.Types.ObjectId.isValid(req.body.paymentId) ? req.body.deliveryId : new mongoose.Types.ObjectId(req.params.paymentId),
        itemAmount: req.body.itemAmount,
        totalTax: req.body.totalTax,
        totalAmount: req.body.totalAmount
      });

      const delivery = new Delivery({
        deliveryCompany: req.body.deliveryCompany,
        deliveryType: req.body.deliveryType,
        traceNo: req.body.traceNo
      });

      const address = new Address({
        category: req.body.category,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        apartment: req.body.apartment,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        zipcode: req.body.zipcode,
        phone1: req.body.phone1,
        phone2: req.body.phone2
      });

      const payment = new Payment({
        method: req.body.method,
        date: req.body.date,
        amount: req.body.amount,
        status: req.body.status,
        payMethodId: req.body.payMethodId
      });

    const session = await mongoose.startSession();
  
    session.startTransaction();
  
    try {
        // Step 1: create the order
        const [createOrder] = await Order.create([order],{ session });

        // Step 2: create the delivery
        const [createDelivery] = await Delivery.create([delivery],{ session });
    
        // Step 3: create the address
        const [createAddress] = await Address.create([address],{ session });

        // Step 4: create the payment
        const [createPayment] = await Payment.create([payment],{ session });

        // Step 5: update the order
        await Order.updateOne(
            { deliveryId: createDelivery._id }, 
            { shippingAddressId: createAddress._id }, 
            { billingAddressId: createAddress._id }, 
            { paymentId: createPayment._id },
            { session });
            
        // Commit the changes
        await session.commitTransaction();
    
        res.status(200).json([createOrder]);
        console.log("The order has been placed successfully!");
    } catch (error) {
      // Rollback any changes made in the database
      await session.abortTransaction();
  
      // logging the error
      console.error(error);
      res.status(400).json({message: error.message});
  
      // Rethrow the error
      throw error;
    } finally {
      // Ending the session
      session.endSession();
    }
  };