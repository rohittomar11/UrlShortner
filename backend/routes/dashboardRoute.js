import mongoose from "mongoose";
import express from "express";
import {customAlphabet} from "nanoid";
import { linksdata } from "../models/linksdataSchema.js";
import { authMiddleware } from "../services/authMiddleware.js";
export const dashboardRoute=express.Router();
 dashboardRoute.post("/link",authMiddleware,async (req,res)=>{
    console.log("data is come from frontend",req.body);
      const {link}= req.body;
      console.log("links comes from frontend",link);
      const end =customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
      const shot=end();
      console.log("end is",end);
      
      
      const shortURL= `http://localhost:7777/links/${shot}`;;
      console.log("shortURL",shortURL);
      console.log("input link",link);
      console.log("User is " , req.user.userId);
      const userlink= new linksdata({userId : req.user.userId,originalURL: link,shortURL: shortURL});
      console.log("user link",userlink);
      await userlink.save();
      console.log("users links data ",userlink);
    //   console.log("user saved links into data base");
          res.status(200).json({shortURL});

 });

// this is a searcher route*************

 dashboardRoute.get("/:shorts",async (req,res)=>{
    console.log(req.params.shorts);
    try{
      console.log("param",req.params.shorts)
      const short=  `http://localhost:7777/links/${req.params.shorts}`;
      const user= await linksdata.findOne({shortURL:short});
      console.log("user",user);
      if(!user){
        res.status(404).json("oops something went wrong");

      }
      else{
        res.redirect(user.originalURL);

      }
    }
    catch{
        res.status(500).send("server error");
    }
     
 });
   
