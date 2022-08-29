const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: { type: Array, required: true },
  orders: { type: Array, required: false }
})

module.exports = model('User', schema)
