import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import { Client } from '@opensearch-project/opensearch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Initialize OpenSearch client
const client = new Client({ node: process.env.OPENSEARCH_URL });

// Create OpenSearch index with mappings
const createIndex = async () => {
    try {
        const indexExists = await client.indices.exists({ index: 'products' });

        if (!indexExists.body) {
            await client.indices.create({
                index: 'products',
                body: {
                    mappings: {
                        properties: {
                            "Unnamed: 0": { "type": "integer" },
                            "name": { "type": "text" },
                            "main_category": { "type": "keyword" },
                            "sub_category": { "type": "keyword" },
                            "image": { "type": "text" },
                            "link": { "type": "text" },
                            "ratings": { "type": "float" },
                            "no_of_ratings": { "type": "integer" },
                            "discount_price": { "type": "text" },
                            "actual_price": { "type": "text" },
                            "product_id": { "type": "keyword" }
                        }
                    }
                }
            });
            console.log('OpenSearch index created with mappings');
        } else {
            console.log('OpenSearch index already exists');
        }
    } catch (error) {
        console.error('Error creating index:', error);
    }
};

createIndex();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
