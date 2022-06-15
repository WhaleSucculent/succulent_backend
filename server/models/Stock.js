import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  action: {type: String, enum: ['In', 'Out']},
  actionAmount: { type: Number },
  actionDate: {type: Date},
  actionPrice: {type: Number}
},{timestamps: true});

const Stock = mongoose.model('Stock', StockSchema);
export default Stock;
