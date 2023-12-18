// libraries Imported
const express = require("express");

const expressAsyncHandler = require("express-async-handler")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const validateToken = require('../Handler/authHandler')

const UserDetail = require("../DB/userSchema")

const router = express.Router();

//------------Routes Starts fro here-----------------

// Register Route
router.route("/register").post(expressAsyncHandler(async (req, res)=>{
    const {user, email, password} = req.body;

    if (!user || !email || !password) {
        res.status(400);
        throw new Error("Please Fill the required Fields");
    }

    const userAvailable = await UserDetail.findOne({email})

    if (userAvailable){
        res.status(400);
        throw new Error("Email is already exists");
    }

    const hashpassword = await bcrypt.hash(password, 10);
    console.log("hash Password: " + hashpassword);

    const userCreated = await UserDetail.create({
        user,
        email,
        password: hashpassword
    });

    if (userCreated) {
        res.status(200).json({_id: userCreated.id, email: userCreated.email})
    }else{
        res.status(400)
        throw new Error("User Data is not Valid")
    }

    res.status(200).json({success: true, Message:"Successful"})
}));

//------------LOGIN--------------

router.route("/login").post(expressAsyncHandler(async (req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const user = await UserDetail.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user :{
                username: user.user,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECERT,
        {expiresIn: "5m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Invalid")
    }
}));

router.route('/current').get(validateToken, expressAsyncHandler(  async (req, res)=>{
    res.json(req.user)
}))

module.exports = router