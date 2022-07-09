// mongoose schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
  GraphQLBoolean,
} from 'graphql';
import Product from '../models/Product.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import AddressType from './OrderTypes/AddressType.js';
import {ProductType, SizeTypeInput} from './ProductTypes/ProductType.js';
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
    product: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return Customer.find();
      },
    },
    customer: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return Customer.findById(args.id);
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
        name: {type:  GraphQLNonNull(GraphQLString)},
        priceList: {type:  GraphQLNonNull(GraphQLList(GraphQLString))},
        postDate:{type: GraphQLNonNull(GraphQLString)},
        size:{type: GraphQLNonNull(SizeTypeInput)},
        // size:{type: GraphQLNonNull(SizeType)},
        colors:{type: GraphQLNonNull(GraphQLList(GraphQLString))},
        category:{type: GraphQLNonNull(GraphQLString)},
        rare:{type: GraphQLNonNull(GraphQLBoolean)},
        description:{type: GraphQLNonNull(GraphQLString)},
        productStatus:{type: GraphQLNonNull(GraphQLString)},
        length:{type: GraphQLNonNull(GraphQLString)},
        review:{type: GraphQLNonNull(GraphQLList(GraphQLString))},
        stock:{type: GraphQLNonNull(GraphQLList(GraphQLString))},
        imageIds: { type: GraphQLNonNull(GraphQLList(GraphQLID))}
      },
      resolve(parent,args){
        const product = new Product({
          name: args.name,
          postDate: args.postDate,
          priceList: args.priceList,
          // size: args.size,
          colors: args.colors,
          category: args.category,
          rare: args.rare,
          description: args.description,
          productStatus: args.productStatus,
          length: args.length,
          review: args.review,
          stock: args.stock,
          images: args.imageIds
        });
        return product.save();
      }
      },
    //Add a customer
    addCustomer:{
      type: CustomerType,
      args:{
        email: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
        firstName: {type: GraphQLNonNull(GraphQLString)},
        lastName: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLNonNull(GraphQLString)},
        role: {type: GraphQLNonNull(GraphQLString)},
        wechatId: {type: GraphQLNonNull(GraphQLString)},
        paypalId: {type: GraphQLNonNull(GraphQLString)},
        creditCards:{type: GraphQLList(GraphQLID)},
        address: {type: GraphQLList(GraphQLID)},
        orders:{type: GraphQLList(GraphQLID)},

      },
      //creating a new customer using the mongoose model
      resolve(parent,args){
        const customer = new Customer({
          email: args.email,
          password: args.password,
          firstName: args.firstName,
          lastName: args.lastName,
          phone: args.phone,
          status: args.status,
          role: args.role,
          wechatId: args.wechatId,
          paypalId: args.paypalId,
          creditCards: args.creditCards,
          address: args.address,
          orders: args.orders
        });
        return customer.save();
      }
    }
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;

