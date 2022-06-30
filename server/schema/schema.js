// mongoose schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} from 'graphql';
import Product from '../models/Product.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import AddressType from './OrderTypes/AddressType.js';
import ProductType from './ProductTypes/ProductType.js';
import CustomerType from './CustomerTypes/CustomerType.js';
import Customer from '../models/Customer.js';
import OrderType from './OrderTypes/OrderType.js';
import { dateScalar } from './utilScalar.js';
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find();
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return Customer.find();
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve() {
        return Order.find();
      },
    },
    order: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.findById(args.id);
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
    // Add an order
    addOrder: {
      type: OrderType,
      args: {
        customerId: { type: GraphQLNonNull(GraphQLID) },
        shippingAddressId: { type: GraphQLNonNull(GraphQLID) },
        billingAddressId: { type: GraphQLNonNull(GraphQLID) },
        // orderDate: { type: GraphQLString},
        orderStatus: {
          type: new GraphQLEnumType({
            name: 'OrderStatus',
            values: {
              unpaid: { value: 'unpaid' },
              undelivered: { value: 'undelivered' },
              receiving: { value: 'receiving' },
            },
          }),
          defaultValue: 'unpaid',
        },
        productsInCartId: { type: GraphQLList(GraphQLID) },
        deliveryId: { type: GraphQLNonNull(GraphQLID) },
        paymentId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const order = new Order({
          customerId: args.customerId,
          shippingAddressId: args.shippingAddressId,
          billingAddressId: args.billingAddressId,
          orderDate: args.orderDate,
          orderStatus: args.orderStatus,
          productsInCartId: args.productsInCartId,
          deliveryId: args.deliveryId,
          paymentId: args.paymentId,
        });
        console.log('Order added');
        return order.save();
      },
    },

    // Delete an order
    deleteOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Order.findByIdAndRemove(args.id);
      },
    },
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
    //Add a product
    addProduct:{
      type: ProductType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        postDate:{type:new GraphQLNonNull(dateScalar)},
        colors:{type:new GraphQLNonNull(GraphQLString)},
        category:{type:new GraphQLNonNull(GraphQLString)},
        rare:{type:new GraphQLNonNull(GraphQLBoolean)},
        description:{type:new GraphQLNonNull(GraphQLString)},
        productStatus:{type:new GraphQLNonNull(GraphQLString)},
        length:{type:new GraphQLNonNull(GraphQLString)},
        
      }
    }
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
