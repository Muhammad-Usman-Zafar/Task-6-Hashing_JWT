const expressAsyncHandler = require("express-async-handler")
const express = require("express");

const app = express();

const ValidateToken =  require("../Handler/authHandler");

 const router = express.Router();

const Contact = require("../DB/Schema")

app.use(ValidateToken)

router.route("/users").get(expressAsyncHandler( async (req, res)=>{
    const users = await Contact.find({user_id: req.user.id});
    res.status(200).send(users)
}));

router.route("/users/:id").get( expressAsyncHandler( async (req, res)=>{
    const user = await Contact.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User Not Found")
    }

    res.status(200).json({success:true, data: user})

}));

router.route("/update/:id").put(expressAsyncHandler(async(req, res)=>{
    const users = await Contact.findById(req.params.id);
    if (!users) {
        res.status(404);
        throw new Error("User Not Found")
    }

    const userUpdate = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true});
    
    res.status(200).json({success:true, data: userUpdate})

}));

router.route("/create").post( expressAsyncHandler( async (req, res)=>{
    const {name , email, role} = req.body;

    if(!name || !email || !role){
        res.status(400).json({success: false, msg: "Fill all the Fields!"})
        throw new Error("Sub Fill kro chalo Shabash")
    }
    const newUser = await Contact.create({
        user,
        email,
        password
    });
    res.status(200).json({success: true, data: newUser})
}));

module.exports = router