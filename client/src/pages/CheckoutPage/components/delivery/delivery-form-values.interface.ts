import { AddressFormValues } from '../address/address-form-values.interface';
import { ShippingMethod } from './components/shipping-method.enum';
import { ShippingCompany } from './components/shipping-company.enum';
import { SignupFormValues } from '../signup/signup-form-values.interface';

export interface DeliveryFormValues {
  shippingAddress: AddressFormValues;
  shippingMethod?: ShippingMethod;
  shippingCompany?: ShippingCompany;
  signup: SignupFormValues;
}