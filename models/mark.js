import mongoose from "mongoose";
const GradeSchema = new mongoose.Schema({
    name:{type:String , required:true},
    totalMark:{type:Number, required:true},
    averegMark:{type:Number, required:true}
})

export const mark = mongoose.model('mark',GradeSchema)