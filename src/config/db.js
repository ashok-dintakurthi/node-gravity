import { MongoClient } from 'mongodb';
import { handleError } from '../utils/errorHandler.js';
import { ERROR_MESSAGES } from '../constants/index.js';

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(ERROR_MESSAGES.MISSING_MONGODB_URI);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    return client;
  } catch (err) {
    handleError(new Error(`${ERROR_MESSAGES.DB_CONNECTION_FAILED} ${err.message}`));
  }
}
