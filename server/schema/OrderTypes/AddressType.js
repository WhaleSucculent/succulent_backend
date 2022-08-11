import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
// TODO refactor with same name in redux
const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    address: { type: GraphQLString },
    apartment: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    state: { type: GraphQLString },
    zipcode: { type: GraphQLString },
    phone1: { type: GraphQLString },
    phone2: { type: GraphQLString },
  }),
});

export default AddressType;
