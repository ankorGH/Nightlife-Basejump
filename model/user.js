let mongooose = require("mongoose");
let Schema = mongooose.Schema;

let UserSchema = new Schema({
  username: String,
  twitterId: Number
});

const UserModel = mongooose.model("user", UserSchema);

module.exports = UserModel;
