import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
  {
    category: {type: String, enum: ["Customer", "Shipping", "Billing"]},
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    apartment: { type: String },
    city: { type: String },
    country: { type: String },
    state: { type: String },
    zipcode: { type: String },
    phone1: { type: String },
    phone2: { type: String },
  },
  { timestamps: true }
);

const Address = mongoose.model('Address', AddressSchema);
export default Address;
