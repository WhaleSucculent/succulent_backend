import Address from '../models/Address.js';

  export const getAllAddresss = async(req, res) => {
    res.send("Get all Addresss");
  };
  
  export const getOneAddress = async(req, res) => {
    res.send("Get an existing Address");
  };
  
  export const createNewAddress = async(req, res) => {
    const data = new Address({
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
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  };
  
  export const updateOneAddress = async(req, res) => {
    res.send("Update an existing Address");
  };
  
  export const deleteOneAddress = async(req, res) => {
    try {
      const id = req.params.id;
      const data = await Address.findByIdAndDelete(id)
      res.send(`Document with ${data._id} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  };