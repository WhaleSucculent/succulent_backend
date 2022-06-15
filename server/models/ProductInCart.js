import mongoose from 'mongoose';

const ProductInCartSchema = new mongoose.Schema({
  qty: { type: Number, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  price: { type: Number, required: true },
});

const ProductInCart = mongoose.model('ProductInCart', ProductInCartSchema);
export default ProductInCart;
