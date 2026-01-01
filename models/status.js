import mongoose from "mongoose"
const statusSchema = mongoose.Schema(
{
    status:{
        type:String,
        
        require:true
    }
})
const statusModel = mongoose.model("statuses",statusSchema)
export default statusModel;
