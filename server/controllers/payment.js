import Payment from '../models/Payment.js';

  export const getAllPayments = async(req, res) => {
    res.send("Get all Payments");
  };
  
  export const getOnePayment = async(req, res) => {
    res.send("Get an existing Payment");
  };
  
  export const createNewPayment = async(req, res) => {
    const data = new Payment({
      method: req.body.method,
      date: req.body.date,
      amount: req.body.amount,
      status: req.body.status,
      payMethodId: req.body.payMethodId
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  };
  
  export const updateOnePayment = async(req, res) => {
    res.send("Update an existing Payment");
  };
  
  export const deleteOnePayment = async(req, res) => {
    try {
      const id = req.params.id;
      const data = await Payment.findByIdAndDelete(id)
      res.send(`Document with ${data._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  };