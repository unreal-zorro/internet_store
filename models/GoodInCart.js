const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  categoryId: { type: Types.ObjectId, ref: 'Category' },
  goodId: { type: Types.ObjectId, ref: 'Good' },
  count: { type: Number, required: true },
  userId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('GoodInCart', schema)
