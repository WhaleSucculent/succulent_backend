import { model, Schema, Types } from 'mongoose';

interface ICustomer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  role: string;
  wechatId: string;
  paypalId: string;
  creditCardIds: Types.ObjectId;
  addressIds: Types.ObjectId;
  orderIds: Types.ObjectId;
}

const CustomerSchema = new Schema<ICustomer>({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  status: { type: String, enum: ['active', 'inactive'] },
  role: { type: String, enum: ['user', 'admin'] },
  wechatId: { type: String },
  paypalId: { type: String },
  creditCardIds: [{ type: Schema.Types.ObjectId, ref: 'CreditCard' }],
  addressIds: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  orderIds: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

const Customer = model<ICustomer>('Customer', CustomerSchema);
export default Customer;
