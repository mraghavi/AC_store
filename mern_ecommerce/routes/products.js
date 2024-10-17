import express from 'express';
import { Client } from '@opensearch-project/opensearch';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const router = express.Router();
const client = new Client({ node: process.env.OPENSEARCH_URL });

// Route to fetch all products from OpenSearch
router.get('/', async (req, res) => {
    try {
        const { body } = await client.search({
            index: 'amazon-products',
            body: {
                query: {
                    match_all: {}
                },
                size: 1000 
            }
        });

        const products = body.hits.hits.map(hit => hit._source);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Route to fetch product details by ID
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { body } = await client.search({
            index: 'amazon-products',
            body: {
                query: {
                    match: { 'Unnamed: 0': productId }
                }
            }
        });

        if (body.hits.hits.length > 0) {
            res.json(body.hits.hits[0]._source);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product details' });
    }
});

export default router;
