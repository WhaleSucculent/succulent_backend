import { initialAddressFormValues } from '../address/address-form.initial';
import { PaymentMethod } from './components/payment-method.enum';
import { PaymentFormValues } from './payment-form-values.interface';
import { initialCreditCardValues } from '../credit-card/credit-card-form-values.initial';

export const initialPaymentFormValues: PaymentFormValues = {
    sameAsShipping: false,
    billingAddress: initialAddressFormValues,
    paymentMethod: PaymentMethod.creditcard,
    creditCard: initialCreditCardValues
};