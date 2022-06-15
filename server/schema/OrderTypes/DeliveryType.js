import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

const DeliveryType = new GraphQLObjectType({
  name: 'Delivery',
  fields: () => ({
    id: { type: GraphQLID },
    deliveryCompany: { type: GraphQLString },
    deliveryType: { type: GraphQLString },
    traceNo: { type: GraphQLString },
  }),
});

export default DeliveryType;
