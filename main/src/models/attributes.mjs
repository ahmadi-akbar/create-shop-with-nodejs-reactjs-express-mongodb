import mongoose from 'mongoose';
const AttributesSchema = new mongoose.Schema({
    name: {},
    slug: {
        type: String,
        required: false,
        trim: true
    },
<<<<<<< HEAD
=======
    type: {
      type: String,
      default: "normal"
    },
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    image: String,
    data: {},
    values:[],
    parent:{type: mongoose.Schema.Types.ObjectId, ref: 'Attributes'} //category_id
});
// module.exports = mongoose.model('Attributes', AttributesSchema);
export default mongoose.model('Attributes', AttributesSchema);