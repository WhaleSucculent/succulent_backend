import { TFunction } from 'i18next';
import { mixed,boolean, object } from 'yup';
import { PaymentMethod } from './components/payment-method.enum';
import { addressFormSchema } from '../address/address-form.schema';
import { creditCardSchema } from '../credit-card/credit-card-form.schema';

export const paymentFormSchema = (t: TFunction) =>
  object().shape({
    sameAsShipping: boolean(),
    billingAddress: object().when('sameAsShipping', {
      is: (sameAsShipping: boolean) => !sameAsShipping,
      then: addressFormSchema(t),
    }),
    paymentMethod: mixed<PaymentMethod>().oneOf(
      Object.values(PaymentMethod) as PaymentMethod[]
    ),
    creditCard: creditCardSchema(t),
  });