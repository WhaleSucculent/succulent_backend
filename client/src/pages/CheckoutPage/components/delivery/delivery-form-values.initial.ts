import { initialAddressFormValues } from '../address/address-form.initial';
import { DeliveryFormValues } from './delivery-form-values.interface';
import { ShippingMethod } from './components/shipping-method.enum';
import { ShippingCompany } from './components/shipping-company.enum';
import { initialSignupFormValues } from '../signup/signup-form-values.initial';

export const initialDevlieryFormValues: DeliveryFormValues = {
  shippingAddress: initialAddressFormValues,
  shippingMethod: ShippingMethod.standard,
  shippingCompany: ShippingCompany.ups,
  signup: initialSignupFormValues,
};