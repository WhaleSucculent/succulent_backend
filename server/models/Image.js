import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  category: { type: String },
  name: { type: String },
  length: { type: Number },
  width: { type: Number },
  size: { type: Number },
  format: { type: String },
  imageLink: { type: String },
}, { timestamps: true });

const Image = mongoose.model('Image', ImageSchema);
export default Image;
