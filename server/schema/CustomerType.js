import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLScalarType,
} from "graphql";
import AddressType from "./AddressType.js";
import dateScalar from "./CustomScalar.js";
import Address from '../models/Address.js';

const CreditCardType = new GraphQLObjectType({
  name: "CreditCard",
  fields: () => ({
      id: { type: GraphQLID },
    cardNo: { type: GraphQLString },
    holderName: { type: GraphQLString },
    expirationDate: { type: dateScalar },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
   id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    role: { type: GraphQLString },
    wechatId: { type: GraphQLString },
    paypalId: { type: GraphQLString },
    creditCards: { type: CreditCardType },
    addresses: { 
      type: AddressType,
   resolve(parent, args) {
      return Address.findById(parent.addressesId);
    },
   },
  }),
});

export default CustomerType;
