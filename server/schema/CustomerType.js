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

const CreditCardType = new GraphQLObjectType({
  name: "CreditCard",
  fields: () => ({
    cardNo: { type: GraphQLString },
    holderName: { type: GraphQLString },
    expirationDate: { type: dateScalar },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
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
    addresses: { type: AddressType },
  }),
});

export default CustomerType;
