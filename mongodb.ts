// mongodb.ts

import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = "mongodb+srv://cluster1.rpviiqp.mongodb.net/"; // Replace with your MongoDB URI
const options: MongoClientOptions = {};

const connectToDatabase = async () => {
    try {
        const client = await MongoClient.connect(uri, options);
        console.log('Connected to MongoDB');
        // Perform operations with the client

        // Remember to close the connection when you're done
        client.close();
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

export default connectToDatabase;
