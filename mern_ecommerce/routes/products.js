import express from 'express';
import { Client } from '@opensearch-project/opensearch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const client = new Client({ node: process.env.OPENSEARCH_URL });

// Route to fetch all products from the amazon-products index
router.get('/', async (req, res) => {
    try {
        const { body } = await client.search({
            index: 'amazon-products', // Change to your correct index name
            body: {
                query: {
                    match_all: {} // This retrieves all products from OpenSearch
                },
                size: 1000 
            }
        });

        const products = body.hits.hits.map(hit => hit._source);
        res.json(products); // Return the products
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
    // Add this route to your existing products.js file
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { body } = await client.search({
            index: 'amazon-products',
            body: {
                query: {
                    match: { 'Unnamed: 0': productId } // Change this to the appropriate field for your unique identifier
                }
            }
        });

        if (body.hits.hits.length > 0) {
            res.json(body.hits.hits[0]._source); // Return the first matching product
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product details' });
    }
});

});

export default router;
