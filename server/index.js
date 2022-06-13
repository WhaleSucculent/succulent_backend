import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import connectDB from './config/db.js'
import cors from 'cors';
import schema from './schema/schema.js';

const port = process.env.PORT || 5000;

const app = express();

// connect to mongoDB
dotenv.config()
connectDB()

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
