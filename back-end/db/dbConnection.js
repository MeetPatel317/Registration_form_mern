const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/30DaysCoding_login_logout");
        console.log("Connected to mongodb");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;