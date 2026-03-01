import statusModel from "../models/status.js";

export const statusDisplay = async (req,res)=>{
try {const data = await statusModel.find()
    if(!data){
        res.status(401).send("there is no status")
    }
    res.json(data)
}
catch(error){
    res.status(400).json({
        success:false,
        massage:error.details[0].message
    })
}

}
export const insertStatus = async (req,res) =>{
    try{
    const status = req.body
    const data = await statusModel.create(status)
res.status(201).json(data)
}
    

catch(error){
    res.status(400).json({
        success:false,
        massage:error.details[0].message
    })
}
}
