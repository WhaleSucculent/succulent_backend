import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import Address from '../models/Address.js';
import Customer from '../models/Customer.js';
import Delivery from '../models/Delivery.js';
import Payment from '../models/Payment.js';
import ProductInCart from '../models/ProductInCart.js';
import AddressType from './AddressType.js';
import CustomerType from './CustomerType.js';
import dateScalar from './CustomScalar.js';
import DeliveryType from './DeliveryType.js';
import PaymentType from './PaymentType.js';
import ProductInCartType from './ProductInCartType.js';

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    customer: {
      type: CustomerType,
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      },
    },
    shippingAddress: {
      type: AddressType,
      resolve(parent, args) {
        return Address.findById(parent.shippingAddressId);
      },
    },
    billingAddress: {
      type: AddressType,
      resolve(parent, args) {
        return Address.findById(parent.billingAddressId);
      },
    },
    orderDate: { type: dateScalar },
    orderStatus: { type: GraphQLString },
    productsInCart: {
      type: new GraphQLList(ProductInCartType),
      resolve(parent, args) {
        return parent.productsInCart.map((productInCart) =>
          ProductInCart.findById(productInCart)
        );
      },
    },

    delivery: {
      type: DeliveryType,
      resolve(parent, args) {
        return Delivery.findById(parent.deliveryId);
      },
    },
    payment: {
      type: PaymentType,
      resolve(parent, args) {
        return Payment.findById(parent.paymentId);
      },
    },
  }),
});

export default OrderType;
