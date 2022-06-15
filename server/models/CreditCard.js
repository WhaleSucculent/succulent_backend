import mongoose from 'mongoose';

const CreditCardSchema = new mongoose.Schema({
  cardNo: { type: Number },
  holderName: { type: String },
  expirationDate: { type: Date },
});

const CreditCard = mongoose.model('CreditCard', CreditCardSchema);
export default CreditCard;