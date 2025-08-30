import mongoose from "mongoose";
const linksdataSchema = new mongoose.Schema({
    userId : String,
    originalURL:String,
    shortURL:String
});
export const linksdata=mongoose.model("linksdata",linksdataSchema);