import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import { dateScalar } from '../utilScalar.js';

const PaymentType = new GraphQLObjectType({
  name: 'Payment',
  fields: () => ({
    id: { type: GraphQLID },
    method: { type: GraphQLString },
    date: { type: dateScalar },
    amount: { type: GraphQLInt },
    status: { type: GraphQLString },
    payMethodId: {type: GraphQLString},
  }),
});


export default PaymentType;
