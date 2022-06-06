import mongoose from 'mongoose';
const SettingsSchema = new mongoose.Schema({
    data: [],
    siteActive:{type: Boolean, default: true},
    siteActiveMessage:String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    activeCategory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    dollarPrice: Number,
    derhamPrice: Number,
    sms_welcome:{},
    sms_register:{},
    sms_submitOrderNotPaying:{},
    sms_submitOrderSuccessPaying:{},
    sms_onSendProduct:{},
    sms_onGetProductByCustomer:{},
    sms_submitReview:{},
    sms_onCancel:{},


});


// module.exports = mongoose.model('Settings', SettingsSchema);
export default mongoose.model('Settings', SettingsSchema);


