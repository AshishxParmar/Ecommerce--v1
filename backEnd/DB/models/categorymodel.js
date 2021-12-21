const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    products: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }

})
const Category = mongoose.model('CategoryData', categorySchema)
module.exports = Category;