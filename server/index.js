import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import connectDB from './config/db.js';
import cors from 'cors';
import schema from './schema/schema.js';
import routes from '../routes/payment-api.js';
import { join } from 'path';
import { BlobServiceClient } from '@azure/storage-blob';
import { v1 as uuidv1 } from 'uuid';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;


// Load .env file content to process.env
dotenv.config();

// async function main() {
//   console.log('Azure Blob storage starting...');

//   const AZURE_STORAGE_CONNECTION_STRING =
//     process.env.AZURE_STORAGE_CONNECTION_STRING;

//   if (!AZURE_STORAGE_CONNECTION_STRING) {
//     throw Error('Azure Storage Connection string not found');
//   }

//   // Create the BlobServiceClient object which will be used to create a container client
//   const blobServiceClient = BlobServiceClient.fromConnectionString(
//     AZURE_STORAGE_CONNECTION_STRING
//   );

//   // Create a unique name for the container
//   const containerName = 'succulent';

//   console.log('\nCreating container...');
//   console.log('\t', containerName);

//   // Get a reference to a container
//   const containerClient = blobServiceClient.getContainerClient(containerName);


//   // Create a unique name for the blob
//   const blobName = uuidv1() + '.jpg';

//   // Get a block blob client
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//   console.log('\nUploading to Azure storage as blob:\n\t', blobName);

//   // Upload data to the blob
  
  
//   const uploadBlobResponse = await blockBlobClient.upload()
//   console.log(
//     'Blob was uploaded successfully. requestId: ',
//     uploadBlobResponse.requestId
//   );
// }

// main()
//   .then(() => console.log('Done'))
//   .catch((ex) => console.log(ex.message));

const port = process.env.PORT || 5000;

const app = express();

// connect to mongoDB

connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.use(urlencoded({extended:false}))
app.use(json())

app.use('/', routes);

app.listen(port, console.log(`Server running on port ${port}`));
