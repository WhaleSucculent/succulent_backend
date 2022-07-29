import {
  GraphQLObjectType,
  GraphQLBoolean,
} from 'graphql';

const RequestReturnType = new GraphQLObjectType({
  name: 'RequestReturnType',
  fields: () => ({
    result: { type: GraphQLBoolean },
  }),
});

export default RequestReturnType;
