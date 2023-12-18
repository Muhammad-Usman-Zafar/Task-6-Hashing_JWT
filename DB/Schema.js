const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    name: {
        type: String,
        required: [true, "Please Add the name."]
    },
    email: {
        type: String,
        required: [true, "Please Add the email."]
    },
    role:{
        type: String,
        required: [true, "Please Add the role."]
    }
})

module.exports = mongoose.model("Users", userSchema)