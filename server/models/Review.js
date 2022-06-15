import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    postDate: { type: Date },
    stars: { type: Number },
    title: { type: String },
    description: { type: String },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
