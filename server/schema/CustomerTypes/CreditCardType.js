import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { dateScalar } from "../utilScalar.js";

const CreditCardType = new GraphQLObjectType({
  name: 'CreditCard',
  fields: () => ({
    id: { type: GraphQLID },
    cardNo: { type: GraphQLString },
    holderName: { type: GraphQLString },
    expirationDate: { type: dateScalar },
  }),
});

export default CreditCardType