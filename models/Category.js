const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  goods: [{ type: Types.ObjectId, ref: 'Good' }]
})

module.exports = model('Category', schema)
