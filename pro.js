import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";

const server=express();
server.use(express.json());

server.get("/",(req,res)=>{
    res.json("Alert data used");
})

server.listen(3000,()=>{
    console.log("SErver started");
})