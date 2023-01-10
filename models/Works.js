const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    hours: {
        type: mongoose.Types.Decimal128,
        require: true
    },
    time_from: {
        type: String,
        require: true
    },
    time_to: {
        type: String,
        require: true
    },
    work_desc: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

const Work = mongoose.model("work", WorkSchema);
module.exports=  Work;