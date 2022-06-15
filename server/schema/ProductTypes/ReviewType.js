import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import Customer from "../../models/Customer.js";
import CustomerType from "../CustomerTypes/CustomerType.js";
import { dateScalar } from "../utilScalar.js";

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    postDate: { type: dateScalar },
    stars: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
    customer: {
      type: CustomerType,
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      },
    },
  }),
});

export default ReviewType