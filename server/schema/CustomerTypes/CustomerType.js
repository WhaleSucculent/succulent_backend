import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLScalarType,
  GraphQLList,
} from 'graphql';
import AddressType from '../OrderTypes/AddressType.js';
import CreditCardType from './CreditCardType.js';
//import { dateScalar } from '../utilScalar.js';
import { MyDate } from '../DataScalar.js';
import CreditCard from '../../models/CreditCard.js';
import Address from '../../models/Address.js';
import OrderType from '../OrderTypes/OrderType.js';
import Order from '../../models/Order.js';
import ProductInCart from '../../models/ProductInCart.js';
import ProductInCartType from '../OrderTypes/ProductInCartType.js';
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
    status: { type: GraphQLString },
    role: { type: GraphQLString },
    wechatId: { type: GraphQLString },
    paypalId: { type: GraphQLString },
    creditCards: {
      type: new GraphQLList(CreditCardType),
      resolve(parent, args) {
        return parent.creditCardIds.map((creditCardId) =>
          CreditCard.findById(creditCardId)
        );
      },
    },
    addresses: {
      type: new GraphQLList(AddressType),
      resolve(parent, args) {
        return parent.addressIds.map((addressId) =>
          Address.findById(addressId)
        );
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return parent.orderIds.map((orderId) => Order.findById(orderId));
      },
      
    },
    cart:{
      type: new GraphQLList(ProductInCartType),
      resolve(parent,args){
        return parent.cartIds.map((cardId)=>ProductInCart.findById(cardId));
      }
    },
  }),
});

export default CustomerType;
