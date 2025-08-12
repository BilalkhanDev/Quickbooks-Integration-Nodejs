const mongoose = require('mongoose');
const { search, paginate } = require("../shared/plugin");

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentUrl: { type: String, required: true },
  documentType: { type: String, required: true }, 

},{timestamps:true});

documentSchema.plugin(search)
documentSchema.plugin(paginate)
module.exports = mongoose.model('Document', documentSchema);
