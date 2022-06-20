import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { dateScalar } from '../utilScalar.js';

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
    length: {type: GraphQLInt},
    width: {type: GraphQLInt},
    size: {type: GraphQLInt},
    format: {type: String},
    dataStream: {type: GraphQLString}
  }),
});

export default ImageType;
