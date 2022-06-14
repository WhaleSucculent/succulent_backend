import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: { type: GraphQLID },
    // customer: { type: CustomerType, resolve(parent, args) {
    //   return Customer.findById(parent.customerId)
    // } },
    firstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Address: { type: GraphQLString },
    Apartment: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    state: { type: GraphQLString },
    zipcode: { type: GraphQLString },
    phone1: { type: GraphQLString },
    phone2: { type: GraphQLString },
  }),
});

export default AddressType