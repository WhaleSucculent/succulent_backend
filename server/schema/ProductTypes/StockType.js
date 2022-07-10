import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import Product from '../../models/Product.js';
//import { dateScalar } from '../utilScalar.js';
import {ProductType} from './ProductType.js';
import { MyDate } from '../DataScalar.js';

const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLID },
    total: {type: GraphQLInt},
    product: {
      type: ProductType,
      resolve(parent, args) {
        return Product.findById(parent.productId);
      },
    },
    action: { type: GraphQLString },
    actionAmount: { type: GraphQLInt },
    actionDate: {type: MyDate},
    actionPrice: {type: GraphQLFloat},
  }),
});

export default StockType;
