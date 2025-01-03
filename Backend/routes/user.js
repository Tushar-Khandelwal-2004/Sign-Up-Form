const { Router } = require("express");
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();
const JWT_SECRET = process.env.JWT_USER;

userRouter.post("/signup", async function (req, res) {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().max(100).min(4),
        firstname: z.string().min(1).max(200),
        lastname: z.string().min(1).max(200)
    })
    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.json({
            message:"You must fill all details correctly"
            // success: false,
            // error: parsedBody.error.errors
        })
    }

    const { email, password, firstname, lastname } = req.body;

    try {
        const existingUser = await userModel.findOne( { email } );
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
module.exports={
    userRouter:userRouter
}