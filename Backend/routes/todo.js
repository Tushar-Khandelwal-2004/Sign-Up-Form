const { Router } = require("express");
const { todoModel } = require("../db");
const { authToken } = require("../middlewares/authToken")
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const todoRouter = Router();
const JWT_SECRET = process.env.JWT_USER;
todoRouter.post("/addtodo", authToken, async function (req, res) {
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
todoRouter.get("/gettodo", authToken, async function (req, res) {
    const userId = req.userId;
    const todos = await todoModel.find(
        { userId }, { title: 1, done: 1, _id: 1 }

    );
    res.json({
        success: true,
        todos
    })
})

module.exports = {
    todoRouter
}
todoRouter.delete("/deletetodo", authToken, async function (req, res) {
    const id = req.headers.id;
    const token=req.headers.token;
    try {
        const response = await todoModel.findByIdAndDelete(id);
        console.log(response);
        if (!response) {
            return res.status(404).json({
                message: "Todo not found!",
                success: false,
            });
        }

        res.json({
            message: "Todo Deleted!",
            success: true,
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error deleting todo!",
            success: false,
        })
    }
})