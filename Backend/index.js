require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");

const {userRouter}=require("./routes/user");
const { todoRouter } = require("./routes/todo");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/todo",todoRouter);
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("connected");
}

main();