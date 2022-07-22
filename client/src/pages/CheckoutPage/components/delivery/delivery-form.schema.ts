import { mixed, object } from 'yup';
import { TFunction } from 'i18next';
import { addressFormSchema } from '../address/address-form.schema';
import { ShippingMethod } from './components/shipping-method.enum';
import { ShippingCompany } from './components/shipping-company.enum';
import { signupFormSchema } from '../signup/signup-form.schema';

export const deliveryFormSchema = (t:TFunction) =>
object().shape({
  shippingAddress: addressFormSchema(t),
  shippingMethod: mixed<ShippingMethod>().oneOf(
    Object.values(ShippingMethod) as ShippingMethod[]
  ),
  shippingCompany: mixed<ShippingCompany>().oneOf(
    Object.values(ShippingCompany) as ShippingCompany[]
  ),
  signup: signupFormSchema(t),
});