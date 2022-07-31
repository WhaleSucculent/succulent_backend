import Delivery from '../models/Delivery.js';

  export const getAllDeliverys = async(req, res) => {
    res.send("Get all Deliverys");
  };
  
  export const getOneDelivery = async(req, res) => {
    res.send("Get an existing Delivery");
  };
  
  export const createNewDelivery = async(req, res) => {
    const data = new Delivery({
      deliveryCompany: req.body.deliveryCompany,
      deliveryType: req.body.deliveryType,
      traceNo: req.body.traceNo
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  };
  
  export const updateOneDelivery = async(req, res) => {
    res.send("Update an existing Delivery");
  };
  
  export const deleteOneDelivery = async(req, res) => {
    try {
      const id = req.params.id;
      const data = await Delivery.findByIdAndDelete(id)
      res.send(`Document with ${data._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  };