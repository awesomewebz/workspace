const mongoose = require("mongoose");

const MHourSchema = new mongoose.Schema({
  hours: {
    type: mongoose.Types.Decimal128,
    require: true,
    default: 0
  },
  month: {
  type: String,
  require: true
  },
  year: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  }
}
);

MHourSchema.index({user: 1, month: 1, year: 1}, {unique:1});

const MHour = mongoose.model("MHour", MHourSchema);
module.exports =  MHour;