import Order from '../models/Order.js';

  export const getAllOrders = async(req, res) => {
    res.send("Get all Orders");
  };
  
  export const getOneOrder = async(req, res) => {
    res.send("Get an existing Order");
  };
  
  export const createNewOrder = async(req, res) => {
    const data = new Order({
      customerId: req.body.customerId,
      shippingAddressId: req.body.shippingAddressId,
      billingAddressId: req.body.billingAddressId,
      orderDate: req.body.orderDate,
      orderStatus: req.body.orderStatus,
      productsInCartIds: req.body.productsInCartIds,
      deliveryId: req.body.deliveryId,
      paymentId: req.body.paymentId
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