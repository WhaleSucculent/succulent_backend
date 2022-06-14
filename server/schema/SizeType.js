import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
  } from 'graphql';

const SizeType = new GraphQLObjectType({
    name: 'Size',
    fields: () => ({
      width: { type: GraphQLString },
      length: { type: GraphQLString },
      height: { type: GraphQLString },
      radius: { type: GraphQLString },
    }),
  });

  export SizeType;