import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLScalarType,
} from 'graphql';
import dateScalar from './CustomScalar.js';
import ProductType from './ProductType.js';

// products type
const ProductsType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {type: GraphQLID},
    name: { type: GraphQLString },
    qty: { type: GraphQLInt },
    // image: { type: Image},
    price: { type: GraphQLInt },
    product: {
      type: ProductType,
    },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: {type: GraphQLID},
    shippingAddressId: { type: GraphQLID },
    billingAddressId: { type: GraphQLID },
    orderDate: { type: dateScalar },
    orderStatus: { type: GraphQLString },
    products: [{ type: ProductsType }],
    delivery: {
      deliveryCompany: { type: GraphQLString },
      deliveryType: { type: GraphQLString },
      traceNo: { type: GraphQLString },
    },
    payment: {
      method: { type: GraphQLString },
      date: { type: dateScalar },
      amount: { type: GraphQLInt },
      status: { type: GraphQLString },
    },
  }),
});

export default OrderType;
