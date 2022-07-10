import { model, Schema } from 'mongoose';

interface IAddress {
  category: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  zipcode: string;
  phone1: string;
  phone2?: string;
}

const AddressSchema = new Schema<IAddress>(
  {
    category: { type: String, enum: ['Customer', 'Shipping', 'Billing'] },
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

const Address = model<IAddress>('Address', AddressSchema);
export { Address, IAddress };
