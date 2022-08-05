import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  method: { type: String, enum: ['WechatPay', 'PayPal', 'CreditCard'] },
  date: { type: Date },
  amount: { type: Number },
  status: { type: String, enum: ['Failure', 'Success'] },
  payMethodId: {type: String }
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
