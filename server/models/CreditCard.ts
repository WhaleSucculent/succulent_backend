import { model, Schema } from 'mongoose';

interface ICreditCard {
  cardNo: number;
  holderName: string;
  expirationDate: Date;
}

const CreditCardSchema = new Schema<ICreditCard>({
  cardNo: { type: Number },
  holderName: { type: String },
  expirationDate: { type: Date },
});

const CreditCard = model<ICreditCard>('CreditCard', CreditCardSchema);
export default CreditCard;
