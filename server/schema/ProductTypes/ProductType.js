import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLBoolean,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';
import Customer from '../../models/Customer.js';
import Image from '../../models/Image.js';
import Product from '../../models/Product.js';
import Review from '../../models/Review.js';
import Stock from '../../models/Stock.js';
import CustomerType from '../CustomerTypes/CustomerType.js';
import ImageType from '../ImageTypes/ImageType.js';
import { dateScalar } from '../utilScalar.js';
import ReviewType from './ReviewType.js';
import StockType from './StockType.js';

// Category Type

// Size type
const SizeType = new GraphQLObjectType({
  name: 'Size',
  fields: () => ({
    width: { type: GraphQLString },
    length: { type: GraphQLString },
    height: { type: GraphQLString },
    radius: { type: GraphQLString },
  }),
});
const SizeTypeInput = new GraphQLInputObjectType({
  name: 'SizeInput',
  fields: () => ({
    width: { type: GraphQLString },
    length: { type: GraphQLString },
    height: { type: GraphQLString },
    radius: { type: GraphQLString },
  })
});
// Stock Type
const StocksType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLID },
    product: { type: ProductType, resolve(parent, args) {
        return Product.findById(parent.productId)
    }},
    amount: { type: GraphQLInt },
    action: { type: GraphQLString },
    createTime: { type: dateScalar },
  }),
});

// Price List type
const PriceListType = new GraphQLObjectType({
  name: 'PriceList',
  fields: () => ({
    price: { type: GraphQLFloat },
    postDate: { type: GraphQLString },
  }),
});

const PriceListTypeInput = new GraphQLInputObjectType({
  name: 'PriceListInput',
  fields: () => ({
    price: { type: GraphQLFloat },
    postDate: { type: GraphQLString },
  })
});
// Product Type
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    priceList: {
      type: new GraphQLList(PriceListType),
      resolve(parent, args) {
        return parent.priceLists;
      },
    },
    postDate: { type: dateScalar },
    // size: {
    //   type: SizeType,
    //   resolve(parent, args) {
    //     return parent.size;
    //   },
    // },
    // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    colors: {
      type: new GraphQLList(GraphQLString),
      resolve(parent, args) {
        return parent.colors;
      },
    },
    category: { type: GraphQLString },
    rare: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    productStatus: { type: GraphQLString },
    length: { type: GraphQLString },
    // productStatus: {
    //   type: GraphQLString,
    // },
    review: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return parent.reviewIds.map((reviewId) => Review.findById(reviewId));
      },
    },
    stock: {
      type: new GraphQLList(StockType),
      resolve(parent, args) {
        return parent.stockIds.map((stockId) => Stock.findById(stockId));
      },
    },
    image: {
      type: new GraphQLList(ImageType),
      resolve(parent, args) {
        return parent.imageIds.map((imageId) => Image.findById(imageId));
      }
    }
  }),
});

export { ProductType, SizeTypeInput, PriceListTypeInput};
