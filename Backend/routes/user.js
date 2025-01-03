const { Router } = require("express");
const { userModel } = require("../db");
const { todoModel } = require("../db");
const { authToken } = require("../middlewares/authToken")
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();
const JWT_SECRET = process.env.JWT_USER;

userRouter.post("/signup", async function (req, res) {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().max(100).min(4),
        firstname: z.string().min(2).max(200),
        lastname: z.string().min(2).max(200)
    })
    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.json({
            message: "You must fill all details correctly",
            success: false,
            // error: parsedBody.error.errors
        })
    }

    const { email, password, firstname, lastname } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists."
            })
        }
        const hashedPassowrd = await bcrypt.hash(password, 5);
        await userModel.create({
            email: email,
            password: hashedPassowrd,
            firstname: firstname,
            lastname: lastname
        })
        res.json({
            success: true,
            message: "You have successfully signed up!"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: "An error occurred while signing up"
        });
    }

})
userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(403).send({
            success: false,
            message: "User does not exist",

        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString(),
        }, JWT_SECRET);
        res.json({
            success: true,
            token: token,
            message: "You have successfully signed in!"
        })

    }
    else {
        res.status(403).send({
            success: false,
            message: "Incorrect Credentials!"
        })
    }

});
userRouter.post("/todo", authToken, async function (req, res) {
    const userId = req.userId;
    const { title, done } = req.body;
    try {
        await todoModel.create({
            title,
            done,
            userId
        });
        res.json({
            message: "Todo Created!",
            success: true
        })
    } catch (e) {
        res.json({
            message: "Something went Wrong",
            success: false
        })
    }
})
userRouter.get("/todos", authToken, async function (req, res) {
    const userId=req.userId;
    const todos=await todoModel.find(
        {userId},
        {title:1,done:1,_id:0}
    );
    res.json({
        success:true,
        todos
    })
})
module.exports = {
    userRouter: userRouter
}