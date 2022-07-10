import dayjs from 'dayjs';
import {Kind, GraphQLScalarType } from 'graphql';

const MyDate =  new GraphQLScalarType({
     name: "MyDate",
     description: "Custom description for the date scalar",
     parseValue(value) {
      console.log(value);
       return dayjs(value); // value from the client
     },
     serialize(value) {
      console.log(value);
       return dayjs(value).format("MM-DD-YYYY"); // value sent to the client
     },
     parseLiteral(ast) {
       if (ast.kind === Kind.STRING) {
         return dayjs(ast.value); // ast value is always in string format
       }
       return null;
     },
   });
 
 export {MyDate};