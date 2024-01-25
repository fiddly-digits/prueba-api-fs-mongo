import 'dotenv/config';
import { server } from './src/server.js';
import mongoose from 'mongoose';

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
const port = PORT || 8080;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('Connected to database');
    server.listen(port, () => {
      console.log('server running in http://localhost:8080');
    });
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error}`);
  });
