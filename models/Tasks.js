const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  desc: {
  type: String,
  require: true
  },
  assigned_to: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true,
    default: "assigned"
  },
  completed_at: {
    type: Date
  }
},
{
    timestamps: true
}
);

const Task = mongoose.model("Task", TaskSchema);
module.exports =  Task;