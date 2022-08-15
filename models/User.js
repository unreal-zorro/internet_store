const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ type: Types.ObjectId, ref: 'GoodInCart' }],
  orders: [{ type: Types.ObjectId, ref: 'Order' }]
})

module.exports = model('User', schema)
