import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  shippingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  billingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  orderDate: { type: Date },
  orderStatus: { type: String, enum: ['paid', 'unpaid'] },
  products: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  delivery: {
    deliveryCompany: { type: String },
    deliveryType: { type: String, enum: ['slow', 'fast'] },
    traceNo: { type: String },
  },
  payment: {
    method: { type: String, enum: ['WechatPay', 'PayPal', 'CreditCard'] },
    date: { type: Date },
    amount: { type: Number },
    status: { type: String, enum: ['paid', 'unpaid'] },
  },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
