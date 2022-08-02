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
  GraphQLFloat,
} from 'graphql';
import Product from '../models/Product.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import AddressType from './OrderTypes/AddressType.js';
import { ProductType, SizeTypeInput, PriceListTypeInput } from './ProductTypes/ProductType.js';
import CustomerType from './CustomerTypes/CustomerType.js';
import Customer from '../models/Customer.js';
import OrderType from './OrderTypes/OrderType.js';
import { dateScalar } from './utilScalar.js';
import { MyDate } from './DataScalar.js';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';
import LoginReturnType from './CustomerTypes/LoginReturnType.js';
import ProductInCartType from './OrderTypes/ProductInCartType.js';
import argon2 from 'argon2'
import RequestReturnType from './CustomerTypes/RequestReturnType.js';
import { resetMailOptions, transporter, resetToken, resetTokenExpiry } from '../utils/mailSetup.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args, context) {
        return Product.find();
      }

    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args, context) {
        if (!context.customer || !(context.customer.role === 'admin')) return null;
        return Customer.find();
      },
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Customer.findById(args.id);
      },
    },
    me: {
      type:CustomerType,
      resolve(parent, args, context) {
        if (!context.customer) return null;
        return Customer.findById(context.customer.id);
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args, context) {
        if (!context.customer || !(context.customer.role === 'admin')) return null;
        return Order.find();
      },
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Order.findById(args.id);
      },
    },
    productsInCart: {
      type: ProductInCartType,
      args: {
        id: { type: GraphQLID },

      },
      resolve(parent, args) {
        return ProductInCart.findById(args.id);
      }
    }
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
        customerEmail: {type: GraphQLString},
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
        paymentId: { type: GraphQLID },
        itemAmount: { type: GraphQLFloat },
        totalTax: { type: GraphQLFloat },
        totalAmount: { type: GraphQLFloat},
      },
      resolve(parent, args) {
        const order = new Order({
          customerId: args.customerId,
          shippingAddressId: args.shippingAddressId,
          billingAddressId: args.billingAddressId,
          customerEmail: args.customerEmail,
          orderDate: args.orderDate,
          orderStatus: args.orderStatus,
          productsInCartId: args.productsInCartId,
          deliveryId: args.deliveryId,
          paymentId: args.paymentId,
          itemAmount: args.itemAmount,
          totalTax: args.totalTax,
          totalAmount: args.totalAmount,
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
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        priceList: { type: GraphQLNonNull(GraphQLList(PriceListTypeInput)) },
        postDate: { type: GraphQLNonNull(GraphQLString) },
        size: { type: GraphQLNonNull(SizeTypeInput) },
        // size:{type: GraphQLNonNull(SizeType)},
        colors: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        category: { type: GraphQLNonNull(GraphQLString) },
        rare: { type: GraphQLNonNull(GraphQLBoolean) },
        description: { type: GraphQLNonNull(GraphQLString) },
        productStatus: { type: GraphQLNonNull(GraphQLString) },

        review: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        stock: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        imageIds: { type: GraphQLNonNull(GraphQLList(GraphQLID)) }
      },
      resolve(parent, args, context) {
        if (!context.customer || !(context.customer.role === 'admin')) return null;
        const product = new Product({
          name: args.name,
          postDate: args.postDate,
          priceLists: args.priceList,
          size: args.size,
          colors: args.colors,
          category: args.category,
          rare: args.rare,
          description: args.description,
          productStatus: args.productStatus,
          reviewIds: args.review,
          stockIds: args.stock,
          imageIds: args.imageIds
        });
        return product.save();
      }
    },
    //Update a project
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        postDate: { type: GraphQLString },
        priceLists: { type: GraphQLList(PriceListTypeInput) },
        size: { type: SizeTypeInput },
        colors: { type: GraphQLList(GraphQLString) },
        category: { type: GraphQLString },
        rare: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        productStatus: { type: GraphQLString },
        stock: { type: GraphQLList(GraphQLString) },
        imageIds: { type: GraphQLList(GraphQLID) },

      },
      resolve(parent, args, context) {
        if (!context.customer || !(context.customer.role === 'admin')) return null;
        return Product.findByIdAndUpdate(args.id,
          {
            $set: {
              name: args.name,
              postDate: args.postDate,
              priceLists: args.priceLists,
              size: args.size,
              colors: args.colors,
              category: args.category,
              rare: args.rare,
              description: args.description,
              productStatus: args.productStatus,
              stockIds: args.stock,
              imageIds: args.imageIds
            },

          },
          { new: true });
      }
    },
    //delete a product

    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Product.findByIdAndRemove(args.id);
      }
    },
    //Add a customer
    addCustomer: {
      type: CustomerType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLNonNull(GraphQLString) },
        wechatId: { type: GraphQLNonNull(GraphQLString) },
        paypalId: { type: GraphQLNonNull(GraphQLString) },
        creditCards: { type: GraphQLList(GraphQLID) },
        address: { type: GraphQLList(GraphQLID) },
        orders: { type: GraphQLList(GraphQLID) },

      },
      //creating a new customer using the mongoose model
      resolve(parent, args) {
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
          creditCardIds: args.creditCards,
          addressIds: args.address,
          orderIds: args.orders
        });
        return customer.save();
      },
    },
    //delete a customer
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args, context) {
        if (!context.customer || !(context.customer.role === 'admin')) return null;
        return Customer.findByIdAndRemove(args.id);
      }
    },
    //update a customer
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        status: { type: GraphQLString },
        role: { type: GraphQLString },
        wechatId: { type: GraphQLString },
        paypalId: { type: GraphQLString },
        creditCards: { type: GraphQLList(GraphQLID) },

      },
      resolve(parent, args) {
        return Customer.findByIdAndUpdate(args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email,
              password: args.password,
              phone: args.phone,
              status: args.status,
              role: args.role,
              wechatId: args.wechatId,
              paypalId: args.paypalId,
              creditCardIds: args.creditCards,
            },
          },
          { new: true }
        );
      }
    },

    //Register a new Customer, the role is set to customer by default
    registerCustomer: {
      type: LoginReturnType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const hashedPassword = await argon2.hash(args.password);
        const customer = new Customer({
          email: args.email,
          password: hashedPassword,
          firstName: args.firstName,
          lastName: args.lastName,
          role: 'user',
        });
        const token = generateToken(customer.id)
        customer.save();
        return { token, userId: customer.id }
      }
    },

    loginCustomer: {
      type: LoginReturnType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const customer = await Customer.findOne({ email: args.email })
        if (!customer) {
          return {
            errors: [
              {
                field: "usernameOrEmail",
                message: "that username doesn't exist",
              },
            ],
          };
        }

        const valid = await argon2.verify(customer.password, args.password);

        if (!valid) {
          return {
            errors: [
              {
                field: "password",
                message: "incorrect password",
              },
            ],
          };
        }
        console.log(customer.id)

        const token = generateToken(customer.id)

        return { token, userId: customer.id }
      }
    },

    requestReset: {
      type: RequestReturnType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const customer = await Customer.findOne({ email: args.email })
        if (!customer) {
          return {
            errors: [
              {
                field: "usernameOrEmail",
                message: "that username doesn't exist",
              },
            ],
          };
        }


        const result = await Customer.findOneAndUpdate(
          { email: args.email },
          {
            resetToken,
            resetTokenExpiry,
          }
        );

        if (!result) {
          return {
            errors: [
              {
                field: "email",
                message: "cannot find a customer with that email",
              },
            ],
          };
        }

        try {
          await transporter.sendMail({...resetMailOptions, to: args.email});
        } catch (error) {
          console.log(error);
          return false;
        }
        return { result: true };
      }
    },

    resetPassword: {
      type: RequestReturnType,
      args: {
        token: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const payload = verifyToken(args.token)
        if (!payload) {
          return {
            errors: [
              {
                field: "token",
                message: "that token is invalid",
              },
            ],
          };
        }
        const customer = await Customer.findById(payload.id)
        if (!customer) {
          return {
            errors: [
              {
                field: "token",
                message: "that token is invalid",
              },
            ],
          };
        }

        const hashedPassword = await argon2.hash(args.password);
        customer.password = hashedPassword
        await customer.save()
        return {result: true};
      }
    },

  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;

