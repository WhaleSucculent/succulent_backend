import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';
import Image from '../../models/Image.js';
import Review from '../../models/Review.js';
import ImageType from '../ImageTypes/ImageType.js';
import { MyDate } from '../DataScalar.js';
import ReviewType from './ReviewType.js';


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
const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    total: { type: GraphQLFloat },
    action: { type: GraphQLString },
    actionAmount: { type: GraphQLFloat },
    actionDate: { type: MyDate },
    actionPrice: { type: GraphQLFloat },
  }),
});

// Price List type
const PriceListType = new GraphQLObjectType({
  name: 'PriceList',
  fields: () => ({
    price: { type: GraphQLFloat },
    postDate: { type: MyDate },
  }),
});

const PriceListTypeInput = new GraphQLInputObjectType({
  name: 'PriceListInput',
  fields: () => ({
    price: { type: GraphQLFloat },
    postDate: { type: MyDate },
  })
});

// Image type
const ImageInputType = new GraphQLInputObjectType({
  name: 'ImageInput',
  fields: () => ({
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    imageLink: { type: GraphQLString },
  })
})

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
    postDate: { type: MyDate },
    size: {
      type: SizeType,
      resolve(parent, args) {
        return parent.size;
      },
    },
    stocks: {
      type: new GraphQLList(StockType),
      resolve(parent, args) {
        return parent.stocks;
      }
    },
    quantity: { type: GraphQLInt },
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
    // productStatus: {
    //   type: GraphQLString,
    // },
    review: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return parent.reviewIds.map((reviewId) => Review.findById(reviewId));
      },
    },
    imageLinks: {
      type: new GraphQLList(GraphQLString),
      resolve(parent, args) {
        return parent.imageLinks;
      }
    },
    image: {
      type: new GraphQLList(ImageType),
      resolve(parent, args) {
        return parent.imageIds.map((imageId) => Image.findById(imageId));
      }
    }
  }),
});

export { ProductType, SizeTypeInput, PriceListTypeInput, ImageInputType };
