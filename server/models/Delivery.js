import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  deliveryCompany: { type: String },
  deliveryType: { type: String, enum: ['Standard', 'Expedited'] },
  traceNo: { type: String },
});

const Delivery = mongoose.model('Delivery', DeliverySchema);
export default Delivery;
