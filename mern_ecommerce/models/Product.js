 
// Create the Product model
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    Unnamed: { type: Number },
    name: { type: String, required: true },
    main_category: { type: String, required: true },
    sub_category: { type: String, required: true },
    image: { type: String },
    link: { type: String },
    ratings: { type: Number },
    no_of_ratings: { type: Number },
    discount_price: { type: String },
    actual_price: { type: String },
    product_id: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
