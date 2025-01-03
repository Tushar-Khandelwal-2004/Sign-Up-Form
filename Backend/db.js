const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    firstname: String,
    lastname: String,

});
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    done:Boolean,
    userId:ObjectId

})
const userModel = mongoose.model("user", userSchema);
const todoModel = mongoose.model("todo", todoSchema);
module.exports = {
    userModel,
    todoModel
}