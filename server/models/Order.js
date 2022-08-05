import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerEmail: { type: String },
  shippingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  billingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  orderDate: { type: Date },
  orderStatus: { type: String, enum: ['unpaid', 'undelivered', 'receiving`'] },
  productsInCartIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductInCart' }],
  deliveryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  itemAmount: { type: Number },
  totalTax: { type: Number },
  totalAmount: { type: Number },
  
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
