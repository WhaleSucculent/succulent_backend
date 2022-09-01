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
    total: { type: GraphQLFloat },
    action: { type: GraphQLString },
    actionAmount: { type: GraphQLInt },
    actionDate: {type: MyDate},
    actionPrice: {type: GraphQLFloat},
  }),
});

export default StockType;
