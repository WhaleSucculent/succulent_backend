import { model, Schema } from 'mongoose';

interface IDelivery {
  deliveryCompany: string;
  deliveryType: string;
  traceNo: string;
}

const DeliverySchema = new Schema<IDelivery>({
  deliveryCompany: { type: String },
  deliveryType: { type: String, enum: ['Standard', 'Expedited'] },
  traceNo: { type: String },
});

const Delivery = model<IDelivery>('Delivery', DeliverySchema);
export default Delivery;
