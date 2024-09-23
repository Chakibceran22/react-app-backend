import mongoose from "mongoose";
import User from "../models/userModel.js";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username });
        if(findUser){
            if(findUser.password === password){
                res.send(findUser);
            }
            else{
                res.send({message: "Invalid password. Please try again."});
            }
        }
        else
        {
            res.send({message: "Invalid usernam. Please try again."});
        }
    } catch (error) {
        res.status(404).send({ message: "Error while doing so" });
    }
});

export default router;