import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  active: {type: Boolean, default: true},
  firstCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  secondCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  thirdCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  data: {},
  description: {},
  excerpt: {},
  views: [],
  slug: String,
  title: {},
  kind: {type: String, default: 'post'},
  status: {type: String, default: 'processing'},
  photos: [],

});

export default mongoose.model('Post', PostSchema);
