var mongoose = require("mongoose"),
  passportLocal = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    //required:true
  },
  is_mentor: {
    type: Number,
  },
  discord_id: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
});
userSchema.plugin(passportLocal);
module.exports = mongoose.model("User", userSchema);
