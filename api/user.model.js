const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
let Users = new Schema({
  full_name: {
    type: String
  },
  user_id: {
    type: String
  },
  email: {
    type: String
  },
  birthday: {
    type: String
  }
},{
    collection: 'user'
});

module.exports = mongoose.model('Users', Users);