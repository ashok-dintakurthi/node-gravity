import { handleError } from '../utils/errorHandler.js';
import { mockSalesData } from '../data/mockData.js';
import { ERROR_MESSAGES } from '../constants/index.js';
import { connectToDatabase } from '../config/db.js';

export async function runAggregation() {
  const client = await connectToDatabase();

  const collectionName = process.env.COLLECTION_NAME;
  const db = client.db();

  try {
    const collectionExists = await db.listCollections({ name: collectionName }).hasNext();
    const collection = db.collection(collectionName);

    if (!collectionExists) {
      console.log(` Collection '${collectionName}' does not exist → creating and inserting mock data...`);
      await collection.insertMany(mockSalesData);
      console.log(` Inserted ${mockSalesData.length} mock records into '${collectionName}'.`);
    }

    const pipeline = [
      { $unwind: "$items" },
      {
        $project: {
          store: 1,
          month: { $dateToString: { format: "%Y-%m", date: "$date" } },
          revenue: { $multiply: ["$items.quantity", "$items.price"] },
          price: "$items.price"
        }
      },
      {
        $group: {
          _id: { store: "$store", month: "$month" },
          totalRevenue: { $sum: "$revenue" },
          averagePrice: { $avg: "$price" }
        }
      },
      {
        $project: {
          _id: 0,
          store: "$_id.store",
          month: "$_id.month",
          totalRevenue: 1,
          averagePrice: 1
        }
      },
      { $sort: { store: 1, month: 1 } }
    ];

    const results = await collection.aggregate(pipeline).toArray();
    console.log(" Aggregation Result:");
    console.table(results);

  } catch (error) {
    handleError(new Error(`${ERROR_MESSAGES.AGGREGATION_FAILED} ${error.message}`));
  } finally {
    await client.close();
  }
}
