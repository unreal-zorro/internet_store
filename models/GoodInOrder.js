const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  descr: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  categoryId: { type: Types.ObjectId, ref: 'Category' },
  orderId: { type: Types.ObjectId, ref: 'Order' },
  userId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('GoodInOrder', schema)
