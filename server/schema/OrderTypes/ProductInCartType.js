import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLObjectType } from "graphql";
import Product from "../../models/Product.js";
import {ProductType} from "../ProductTypes/ProductType.js";

const ProductInCartType = new GraphQLObjectType({
  name: 'ProductInCart',
  fields: () => ({
    id: { type: GraphQLID },
    qty: { type: GraphQLInt },
    product: {
      type: ProductType,
      resolve(parent, args) {
        return Product.findById(parent.productId);
      },
    },
    price: {
      type: GraphQLFloat
    }
  }),
});

export default ProductInCartType