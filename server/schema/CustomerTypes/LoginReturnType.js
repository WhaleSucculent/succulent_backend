import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const LoginReturnType = new GraphQLObjectType({
  name: 'LoginReturnType',
  fields: () => ({
    userId: { type: GraphQLID },
    token: {type: GraphQLString}
  }),
});

export default LoginReturnType;
