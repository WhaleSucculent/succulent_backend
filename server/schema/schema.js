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
  GraphQLInt,
} from 'graphql';
import Product from '../models/Product.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import AddressType from './OrderTypes/AddressType.js';
import { ProductType, SizeTypeInput, PriceListTypeInput, ImageInputType } from './ProductTypes/ProductType.js';
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
import { resetMailOptions, transporter, resetToken, resetTokenExpiry, randomBytesPromisified } from '../utils/mailSetup.js';
import { OAuth2Client } from 'google-auth-library';
import Image from '../models/Image.js';
import Payment from '../models/Payment.js';

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
      type: CustomerType,
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
        customerId: { type: GraphQLID },
        shippingAddressId: { type: GraphQLID },
        billingAddressId: { type: GraphQLID },
        customerEmail: { type: GraphQLString },
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
        deliveryId: { type: GraphQLID },
        paymentId: { type: GraphQLID },
        itemAmount: { type: GraphQLFloat },
        totalTax: { type: GraphQLFloat },
        totalAmount: { type: GraphQLFloat },
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

    //Update the Order
    updateOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        orderStatus: { type: GraphQLString },
      },
      resolve(parent, args, context) {
        if (!context.customer || !(context.customer.role === 'admin')) return null;
        return Order.findByIdAndUpdate(args.id, {
          $set: {
            orderStatus: args.orderStatus,
          },
        },
          { new: true }
        );
      }
    },

    // Add an address
    addAddress: {
      type: AddressType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        apartment: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        phone1: { type: GraphQLString },
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
        priceList: { type: GraphQLList(PriceListTypeInput) },
        postDate: { type: GraphQLString },
        size: { type: SizeTypeInput },
        // size:{type: SizeType)},
        colors: { type: GraphQLList(GraphQLString) },
        category: { type: GraphQLString },
        rare: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        productStatus: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        review: { type: GraphQLList(GraphQLString) },
        stock: { type: GraphQLList(GraphQLString) },
        images: { type: GraphQLList(ImageInputType) },
        imageLinks: { type: GraphQLList(GraphQLString) },
      },
      async resolve(parent, args, context) {
        if (!context.customer || !(context.customer.role === 'admin')) return null;


        // const imageArray = await args.images.map(image => {
        //   const createdImage = new Image({
        //     name: image.name,
        //     imageLink: image.imageLink,
        //     category: image.category,
        //   })

        //   return createdImage.save()

        // })
        // const imagIds = await imageArray.then(imgs => {
        //   return imgs.map(img => {
        //     return img._id
        //   })
        // })

        const product = await new Image({
          name: args.images[0].name,
          imageLink: args.images[0].imageLink,
          category: args.images[0].category,
        }).save().then(img => {

          const product = new Product({
            name: args.name,
            postDate: args.postDate,
            priceLists: args.priceList,
            size: args.size,
            quantity: args.quantity,
            colors: args.colors,
            category: args.category,
            rare: args.rare,
            description: args.description,
            productStatus: args.productStatus,
            reviewIds: args.review,
            stockIds: args.stock,
            imageIds: img.id,
            imageLinks: args.imageLinks
          });
          return product.save();
        })
        console.log(product)

        return product
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
        quantity: { type: GraphQLInt },
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
              quantity: args.quantity,
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
        phone: { type: GraphQLString },
        status: { type: GraphQLString },
        role: { type: GraphQLString },
        wechatId: { type: GraphQLString },
        paypalId: { type: GraphQLString },
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
          status: 'active',
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

        return { token: token, userId: customer.id }
      }
    },

    // login with google account
    loginWithGoogle: {
      type: LoginReturnType,
      args: {
        idToken: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        // can't return the token in then, so put token and userId in a variable and return it in the end
        let token
        let userId
        await client.verifyIdToken({
          idToken: args.idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        }).then(async (response) => {
          console.log(response)
          const payload = response.getPayload();
          console.log(payload)
          const googleId = payload['sub'];
          const firstName = payload['given_name'];
          const lastName = payload['family_name'];
          const email = payload['email'];
          const avatar = payload['picture'];
          const role = 'user';
          // TODO replace the password with a random string
          const password = (await randomBytesPromisified(20)).toString("hex");
          const hashedPassword = await argon2.hash(password);
          const customer = new Customer({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            role: role,
            googleId: googleId,
            avatar: avatar,
            status: 'active',
          });
          token = generateToken(customer.id)
          userId = customer.id
          customer.save();

          console.log(token, customer.id)
        }).catch(err => {
          console.log(err)
        })
        return { token, userId }

      }
    },


    // request reset password url and send email to the user with the reset password url
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
          await transporter.sendMail({
            from: process.env.EMAIL_ACCOUNT,
            to: args.email,
            subject: "Password Reset",
            text: `Hello, ${result.firstName}! \n
          You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://succulentbackend.azurewebsites.net/reset/${resetToken}&uuid=${result.id}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
          });
        } catch (error) {
          console.log(error);
          return false;
        }
        return { result: true };
      }
    },

    // reset password with the reset token and the new password
    resetPassword: {
      type: RequestReturnType,
      args: {
        token: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const [token, uuid] = args.token.split('&uuid=')
        const customer = await Customer.findById(uuid)
        if (token !== customer.resetToken || !customer) {
          return {
            errors: [
              {
                field: "token",
                message: "that token is invalid",
              },
            ],
          };
        }
        // TODO: check if token is expired
        // if (Date.now() > customer.resetTokenExpiry) {
        //   return {
        //     errors: [
        //       {
        //         field: "token",
        //         message: "that token has expired",
        //       },
        //     ],
        //   };
        // }

        const hashedPassword = await argon2.hash(args.password);
        customer.password = hashedPassword
        customer.resetToken = null
        customer.resetTokenExpiry = null
        await customer.save()
        return { result: true };
      }
    },

    // update my email address and password
    updateMyEmailPassword: {
      type: RequestReturnType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, context) {
        if (!context.customer.id !== args.id) {
          return {
            errors: [
              {
                field: "id",
                message: "you are not authorized to update this customer",
              },
            ],
          };
        }

        const customer = await Customer.findById(args.id)
        if (!customer) {
          return {
            errors: [
              {
                field: "id",
                message: "that user doesn't exist",
              },
            ],
          };
        }
        customer.email = args.email
        const hashedPassword = await argon2.hash(args.password);
        customer.password = hashedPassword
        await customer.save()
        return { result: true };
      }

    },

    // update my address information
    updateMyAddress: {
      type: RequestReturnType,
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        apartment: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        if (!context.customer.id !== args.id) {
          return {
            errors: [
              {
                field: "id",
                message: "you are not authorized to update this customer",
              },
            ],
          };
        }

        const customer = await Customer.findById(args.id)
        if (!customer) {
          return {
            errors: [
              {
                field: "id",
                message: "that user doesn't exist",
              },
            ],
          };
        }
        customer.firstName = args.firstName
        customer.lastName = args.lastName
        customer.address = args.address
        customer.apartment = args.apartment
        customer.city = args.city
        customer.country = args.country
        customer.state = args.state
        customer.zipcode = args.zipcode
        await customer.save()
        return { result: true };
      }
    },


      // delete my payment information
      deleteMyPayment: {
        type: RequestReturnType,
        args: {
          id: { type: GraphQLString }
        },
        async resolve(parent, args, context) {
          
          const payment = await Payment.findById(args.id)
          if (!payment) {
            return {
              errors: [
                {
                  field: "id",
                  message: "that payment doesn't exist",
                },
              ],
            };
          }
          await payment.remove()
        }
      }



    }
  }
)

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;

