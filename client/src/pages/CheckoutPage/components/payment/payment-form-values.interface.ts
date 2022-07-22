import { AddressFormValues } from '../address/address-form-values.interface';
import { PaymentMethod } from './components/payment-method.enum';
import { CreditCardFormValues } from '../credit-card/credit-card-form-values.interface';

export interface PaymentFormValues {
    sameAsShipping: boolean;
    billingAddress: AddressFormValues;
    paymentMethod?: PaymentMethod;
    creditCard: CreditCardFormValues;
}