const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

const BarSchema = new Schema({
  name: String,
  place_id: String,
  usersAttending: [UserSchema],
  formatted_address: String,
  rating: Number
});

const BarModel = mongoose.model("bar", BarSchema);

module.exports = BarModel;
