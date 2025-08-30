import express from 'express'
import { linksdata } from '../models/linksdataSchema.js';
import { authMiddleware } from '../services/authMiddleware.js';
export const allLinksRoute=express.Router();
allLinksRoute.get("/getAllLinks",authMiddleware,async(req,res)=>{
    try{
    const allLinks= await linksdata.find({userId : req.user.userId});
    console.log("allLinks",allLinks);
    res.status(200).json(allLinks);
    }catch(err){
        res.status(500).json({ error: "Error fetching links" }); 
    }
})