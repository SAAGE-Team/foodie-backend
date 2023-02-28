import mongoose from "moongose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

var product = mongoose.model("Products", productSchema);

module.exports = product;