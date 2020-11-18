const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        trim: true,
        maxlength: 50
    },
    title: {
        type: String,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: Object,
        name: String,
        desc: String,
        image: { 
            data: Buffer,
            contentType: String
        }
    },
    continents: {
        type: Number,
        default: 1
    },
    counter: {
        type: Number,
        default: 0
    },
    inCart:{
        type:Boolean,
        default:false
    },
}, { timestamps: true })


productSchema.index({
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Product = mongoose.model('Products', productSchema);

module.exports = Product