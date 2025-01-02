require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const {userRouter}=require("./routes/user")

const app = express();
app.use(express.json());
app.use("/user",userRouter);
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("connected");
}

main();