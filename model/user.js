import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    sex:String
})
export const User = mongoose.model('students',userSchema)

const gradeSchema = new mongoose.Schema({

    total:Number,
    avarage:Number
})

export const Grade = mongoose.model('grade',gradeSchema)



