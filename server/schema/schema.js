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
} from 'graphql';

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

// Address Type
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

// Product Type
// const ProductType = new GraphQLObjectType({
//   name: 'Product',
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     postDate: { type: GraphQLString },
//     size: {
//       width: { type: GraphQLString },
//       length: { type: GraphQLString },
//       height: { type: GraphQLString },
//     },
//     category: [{ type: GraphQLString }],
//     rare: { type: GraphQLScalarType },
//     description: { type: GraphQLString },
//     productStatus: { type: GraphQLString },
//     priceList: [
//       {
//         price: { type:  },
//       },
//       { timestamps: true },
//     ],
//     colors: [
//       {
//         color: { type: String },
//       },
//     ],
//     images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
//     reviews: [
//       {
//         postData: { type: Date },
//         stars: { type: Number },
//         title: { type: String },
//         description: { type: String },
//         customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
//       },
//     ],
//     stock: [
//       {
//         amount: { type: Number },
//         action: { type: String },
//       },
//       { timestamps: true },
//     ],
//   }),
// });

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    addresses: {
      type: new GraphQLList(AddressType),
      resolve() {
        return Address.find()
      }
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
          lastName:args.lastName,
          address:args.address,
          apartment:args.apartment,
          city:args.city,
          country:args.country,
          state:args.state,
          zipcode:args.zipcode,
          phone1:args.phone1,
          phone2:args.phone2,
        });
        return address.save()
      }
    },

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
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;