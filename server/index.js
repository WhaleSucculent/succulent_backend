import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import connectDB from './config/db.js';
import cors from 'cors';
import schema from './schema/schema.js';
import routes from '../server/routes/payment-api.js';
import morgan from 'morgan'
import { join } from 'path';
import { BlobServiceClient } from '@azure/storage-blob';
import { v1 as uuidv1 } from 'uuid';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { protect } from './middleware/authMiddleware.js';


// Load .env file content to process.env
dotenv.config();


const port = process.env.PORT || 5000;

const app = express();

// connect to mongoDB

connectDB();

app.use(cors({
  origin: "*"
}));

// TODO need switch graphiql to process.env.NODE_ENV === 'development'
app.use(
  '/graphql',
  protect,
  graphqlHTTP({
    schema: schema,
    graphiql: true ,
  })  
);

// app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Restful APIs
app.use('/api/checkout', routes);


// when the address don't meet / and /api/products, it will call the app.use(notFound), app.use(notFound) will pass the error to errorHandler
app.use(notFound);
// errorHandler will handle the error throw by productRouter.js and error passed by notFound
app.use(errorHandler);


app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);

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