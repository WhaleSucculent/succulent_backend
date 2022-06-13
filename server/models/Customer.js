import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  status: { type: String, enum: ['active', 'inactive'] },
  role: { type: String,enum: ['user', 'admin'] },
  wechatId: { type: String },
  paypalId: { type: String },
  creditCards: [
    {
      cardNo: { type: Number },
      holderName: { type: String },
      expirationDate: { type: Date },
    },
  ],
  addressesId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  ordersId:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'} ]
});

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;
