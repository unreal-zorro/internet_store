const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: Number, required: true, unique: true},
  url: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  descr: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  categoryId: { type: Types.ObjectId, ref: 'Category' }
})

module.exports = model('Good', schema)
