// mongoose schema
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLScalarType,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import Product from '../models/Product.js';
import Address from '../models/Address.js'
import AddressType from './AddressType.js';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

// const GraphQLBoolean = new GraphQLScalarType({
//   name: 'Boolean',
//   description: 'Boolean custom scalar type',
//   serialize(value) {
//     return value;
//   },
//   parseValue(value) {
//     return value;
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.BOOLEAN) {
//       return ast.value;
//     }
//     return null;
//   }
// })
// Address Type
// const AddressType = new GraphQLObjectType({
//   name: 'Address',
//   fields: () => ({
//     id: { type: GraphQLID },
//     // customer: { type: CustomerType, resolve(parent, args) {
//     //   return Customer.findById(parent.customerId)
//     // } },
//     firstName: { type: GraphQLString },
//     LastName: { type: GraphQLString },
//     Address: { type: GraphQLString },
//     Apartment: { type: GraphQLString },
//     city: { type: GraphQLString },
//     country: { type: GraphQLString },
//     state: { type: GraphQLString },
//     zipcode: { type: GraphQLString },
//     phone1: { type: GraphQLString },
//     phone2: { type: GraphQLString },
//   }),
// });

// Category Type

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});
// Size type
const SizeType = new GraphQLObjectType({
  name: 'Size',
  fields: () => ({
    width: { type: GraphQLString },
    length: { type: GraphQLString },
    height: { type: GraphQLString },
    radius: { type: GraphQLString },
  }),
});

// Reviews Type
const ReviewsType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    postData: { type: dateScalar },
    stars: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: dateScalar },
    updatedAt: { type: dateScalar },
    //TODO customerId
  }),
});

// Stocks Type
const StocksType = new GraphQLObjectType({
  name: 'Stocks',
  fields: () => ({
    amount: { type: GraphQLInt },
    action: { type: GraphQLString },
    createTime: { type: dateScalar },
  }),
});

// Price List type
const PriceListType = new GraphQLObjectType({
  name: 'PriceList',
  fields: () => ({
    price: { type: GraphQLInt },
    createdTime: { type: dateScalar },
  }),
});

// Product Type
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    postDate: { type: dateScalar },
    size: {
      type: SizeType, 
      resolve(parent,args) {
        return Product.findById(parent.sizeId)
      }
    },
    category: { type: CategoryType },
    rare: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    // productStatus: {
    //   type: GraphQLString,
    // },
    priceList: {
      type: PriceListType
    },
    colors: { type: GraphQLString },
    // // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    reviews: {
      type: ReviewsType,
    },
    stock: {
      type: StocksType,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    addresses: {
      type: new GraphQLList(AddressType),
      resolve() {
        return Address.find();
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find();
      },
    },
    
    // projects: {
    //   type: new GraphQLList(ProjectType),
    //   resolve() {
    //     return Project.find();
    //   },
    // },
    // project: {
    //   type: ProjectType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Project.findById(args.id);
    //   },
    // },
    // clients: {
    //   type: new GraphQLList(ClientType),
    //   resolve() {
    //     return Client.find();
    //   },
    // },
    // client: {
    //   type: ClientType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Client.findById(args.id);
    //   },
    // },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add an address
    addAddress: {
      type: AddressType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        apartment: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLNonNull(GraphQLString) },
        zipcode: { type: GraphQLNonNull(GraphQLString) },
        phone1: { type: GraphQLNonNull(GraphQLString) },
        phone2: { type: GraphQLString },
      },
      resolve(parent, args) {
        const address = new Address({
          firstName: args.firstName,
          lastName: args.lastName,
          address: args.address,
          apartment: args.apartment,
          city: args.city,
          country: args.country,
          state: args.state,
          zipcode: args.zipcode,
          phone1: args.phone1,
          phone2: args.phone2,
        });
        return address.save();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;

// Add a new Client
// addClient: {
//   type: ClientType,
//   args: {
//     name: { type: GraphQLNonNull(GraphQLString) },
//     email: { type: GraphQLNonNull(GraphQLString) },
//     phone: { type: GraphQLNonNull(GraphQLString) },
//   },
//   resolve(parent, args) {
//     const client = new Client({
//       name: args.name,
//       email: args.email,
//       phone: args.phone,
//     });

//     return client.save();
//   },
// },
// // Delete a Client
// deleteClient: {
//   type: ClientType,
//   args: {
//     id: { type: GraphQLNonNull(GraphQLID) },
//   },
//   resolve(parent, args) {
//     return Client.findByIdAndRemove(args.id);
//   },
// },

// // add a project
// addProject: {
//   type: ProjectType,
//   args: {
//     name: { type: GraphQLNonNull(GraphQLString) },
//     description: { type: GraphQLNonNull(GraphQLString) },
//     status: {
//       type: new GraphQLEnumType({
//         name: 'ProjectStatus',
//         values: {
//           new: { value: 'Not Started' },
//           progress: { value: 'In Progress' },
//           completed: { value: 'Completed' },
//         },
//       }),
//       defaultValue: 'Not Started',
//     },
//     clientId: { type: GraphQLNonNull(GraphQLID) },
//   },
//   resolve(parent, args) {
//     const project = new Project({
//       name: args.name,
//       description: args.description,
//       status: args.status,
//       clientId: args.clientId,
//     });

//     return project.save();
//   },
// },

// // delete a project
// deleteProject: {
//   type: ProjectType,
//   args: {
//     id: { type: GraphQLNonNull(GraphQLID) },
//   },
//   resolve(parent, args) {
//     return Project.findByIdAndRemove(args.id);
//   },
// },

// // Update a project
// updateProject: {
//   type: ProjectType,
//   args: {
//     id: { type: GraphQLNonNull(GraphQLID) },
//     name: { type: GraphQLString },
//     description: { type: GraphQLString },
//     status: {
//       type: new GraphQLEnumType({
//         name: 'ProjectStatusUpdate',
//         values: {
//           new: { value: 'Not Started' },
//           progress: { value: 'In Progress' },
//           completed: { value: 'Completed' },
//         },
//       }),
//     },
//   },
//   resolve(parent, args) {
//     return Project.findByIdAndUpdate(
//       args.id,
//       {
//         $set: {
//           name: args.name,
//           description: args.description,
//           status: args.status,
//         },
//       },
//       { new: true }
//     );
//   },
// },
