const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
  type: String,
  require: true,
  unique: true
  },
  equity: {
    type: mongoose.Types.Decimal128 ,
    require: true
  },
  mobile: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true
  }
},
{
    timestamps: true
}
);

const User = mongoose.model("User", UserSchema);
module.exports =  User;