const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  date: { type: Date, required: true }, // order`s date
  number: { type: Number, required: true }, // order`s number
  goods: [{ type: Types.ObjectId, ref: 'GoodInOrder' }], // goods in order
  delivery: { type: String, required: true },
  payment: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
  count: { type: Number, required: true }, // count of goods in order
  amount: { amount: Number, required: true }, // amount of money in order
  userId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Order', schema)
