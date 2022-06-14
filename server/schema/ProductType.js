import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLScalarType,
} from 'graphql';
import dateScalar from './CustomScalar.js';


// Category Type

// Size type
const SizeType = new GraphQLObjectType({
  name: 'Size',
  fields: () => ({
    id: { type: GraphQLID },
    width: { type: GraphQLString },
    length: { type: GraphQLString },
    height: { type: GraphQLString },
    radius: { type: GraphQLString },
  }),
});

// Reviews Type
const ReviewsType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    postData: { type: dateScalar },
    stars: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
    //TODO customerId
  }),
});

// Stocks Type
const StocksType = new GraphQLObjectType({
  name: 'Stocks',
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    action: { type: GraphQLString },
    createTime: { type: dateScalar },
  }),
});

// Price List type
const PriceListType = new GraphQLObjectType({
  name: 'PriceList',
  fields: () => ({
    id: { type: GraphQLID },
    price: { type: GraphQLInt },
    createdTime: { type: dateScalar },
  }),
});

// Product Type
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    postDate: { type: dateScalar },
    size: {
      type: SizeType,
      resolve(parent, args) {
        return SizeType.findBy(parent.id)
      }
    },
    category: { type: GraphQLString },
    rare: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    // productStatus: {
    //   type: GraphQLString,
    // },
    priceList: {
      type: PriceListType,
    },
    colors: { type: GraphQLString },
    // // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    reviews: {
      type: ReviewsType,
    },
    stock: {
      type: StocksType,
    },
  }),
});

export default ProductType