import { mark } from "../models/mark.js";
export const createMark = async(req,res)  => {
try{const {name,totalMark} = req.body
if (!name || typeof totalMark !== 'number' || totalMark < 0) {
            return res.status(400).json({ 
                message: "Invalid input: 'name' is required and 'totalMark' must be a non-negative number." 
            });
        }
const averegMark = req.body.totalMark / 10
const marks = await mark.create({name,totalMark,averegMark})
res.json(marks)}
catch(error){
    res.status(500).json({message:error.message})
}
}
export const displayMark = async(req,res) =>{
    try{const displayMark = await mark.find()
    res.json(displayMark)
    console.log(displayMark);
}catch(error){
    res.status(500).json({message:error.message})
}
}