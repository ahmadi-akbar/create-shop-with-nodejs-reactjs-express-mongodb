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
<<<<<<< HEAD
  kind: {type: String, default: 'post'},
  status: {type: String, default: 'processing'},
  photos: [],
=======
  elements: {},
  kind: {type: String, default: 'post'},
  status: {type: String, default: 'processing'},
  photos: [],
  thumbnail: String,
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

});

export default mongoose.model('Post', PostSchema);
