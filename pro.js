import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";

const server=express();
server.use(express.json());
server.use(cors());

await mongoose.connect("mongodb+srv://ssvsurajvishwakarma_db_user:7058@cluster0.kn1gsi8.mongodb.net/?appName=Cluster0");
console.log("MongoDB connected");

const User=mongoose.model("User",new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    image:String
}));

server.post("/signup",async (req,res)=>{
   try{const {name,email,password,image}=req.body;
   if(!name || !email || !password || !image){
    return res.json({message:"All fields re required"});
   }
   const hashed=await bcrypt.hash(password,10);
   const user=await User.create({
    name,
    email,
    password:hashed,
    image
   });
  res.json({
    message:"Account created"
  })
}
catch(e){
    console.log(e);
}});

server.post("/login",async (req,res)=>{
   const {email,password}=req.body;
   if( !email || !password){
    return res.json({message:"All fields re required"});
   }
   const user=await User.findOne({email});
   if (!user) {
      return res.json({ message: "User not found" });
    }
   const cform=await bcrypt.compare(password,user.password);
   if(!cform) return res.json({message:"Invalid password"});
   res.json({message:"Loged in successfully" ,Account:user});
});

server.listen(3000,()=>{
    console.log("SErver started");
})