import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    postDate: { type: Date },
    size: {
      width: { type: Number },
      length: { type: Number },
      height: { type: Number },
      radius: { type: Number}
    },
    category: [{ type: String }],
    rare: { type: Boolean },
    description: { type: String },
    productStatus: { type: String, enum: ['Sold Out', 'In Stock'] },
    priceList: [
      {
        price: { type: Number },
      },
      { timestamps: true },
    ],
    colors: [
      {
        color: { type: String },
      },
    ],
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    reviews: [
      {
        postData: { type: Date },
        stars: { type: Number },
        title: { type: String },
        description: { type: String },
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      },
    ],
    stock: [
      {
        amount: { type: Number },
        action: { type: String },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
