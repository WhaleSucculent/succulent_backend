import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    postDate: { type: Date },
    size: {
      width: { type: Number },
      length: { type: Number },
      height: { type: Number },
      radius: { type: Number },
    },
    category: { type: String },
    rare: { type: Boolean },
    description: { type: String },
    productStatus: { type: String, enum: ['Sold Out', 'In Stock'] },
    priceLists: [
      {
        price: { type: Number },
        postDate: { type: Date },
      },
    ],
    colors: [{ type: String }],
    // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    reviewIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    stockIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
