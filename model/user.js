const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const UserSchema = new Schema({
  username: String,
  twitterId: Number
});

const UserModel = mongooose.model("user", UserSchema);

module.exports = UserModel;
