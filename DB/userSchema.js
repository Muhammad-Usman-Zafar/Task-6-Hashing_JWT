const moongoose = require("mongoose");

const userSchema = moongoose.Schema({
    user: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email address"],
        unique: [true, "The email address is already resgistered."]
    },
    password: {
        type: String,
        required: [true, "Please Enter the password"]
    }
})

module.exports = moongoose.model("Users detail", userSchema)