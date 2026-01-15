import mongoose from 'mongoose'


const ticketSchema = mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   category:{
    type:String
   },
   status:{
    type:String,
    enum:["open","in-progress","closed"],
    default:"open"
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }
},{timestamps:true})

export const Ticket = mongoose.model("Ticket",ticketSchema)