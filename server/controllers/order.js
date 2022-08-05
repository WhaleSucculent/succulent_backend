import Order from '../models/Order.js';
import mongoose from 'mongoose';

  export const getAllOrders = async(req, res) => {
    res.send("Get all Orders");
  };
  
  export const getOneOrder = async(req, res) => {
    res.send("Get an existing Order");
  };
  
  export const createNewOrder = async(req, res) => {
    const data = new Order({
      customerId: mongoose.Types.ObjectId.isValid(req.body.customerId) ? req.body.customerId : mongoose.Types.ObjectId(req.params.customerId),
      customerEmail: req.body.customerEmail,
      shippingAddressId: mongoose.Types.ObjectId.isValid(req.body.shippingAddressId) ? req.body.shippingAddressId : mongoose.Types.ObjectId(req.params.shippingAddressId),
      billingAddressId: mongoose.Types.ObjectId.isValid(req.body.billingAddressId) ? req.body.billingAddressId : mongoose.Types.ObjectId(req.params.billingAddressId),
      orderDate: req.body.orderDate,
      orderStatus: req.body.orderStatus,
      productsInCartIds: mongoose.Types.ObjectId.isValid(req.body.productsInCartIds) ? req.body.productsInCartIds : mongoose.Types.ObjectId(req.params.productsInCartIds),
      deliveryId: mongoose.Types.ObjectId.isValid(req.body.deliveryId) ? req.body.deliveryId : mongoose.Types.ObjectId(req.params.deliveryId),
      paymentId: mongoose.Types.ObjectId.isValid(req.body.paymentId) ? req.body.deliveryId : mongoose.Types.ObjectId(req.params.paymentId),
      itemAmount: req.body.itemAmount,
      totalTax: req.body.totalTax,
      totalAmount: req.body.totalAmount
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  };
  
  export const updateOneOrder = async(req, res) => {
    res.send("Update an existing Order");
  };
  
  export const deleteOneOrder = async(req, res) => {
    try {
      const id = req.params.id;
      const data = await Order.findByIdAndDelete(id)
      res.send(`Document with ${data._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  };