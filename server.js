import express from 'express'
import { connectDB } from './config/database.js'
// Assuming both User and Grade are correctly exported from this file
import { User, Grade } from './model/user.js' 
import cors from 'cors'

const app = express()

// Middleware to parse incoming JSON payloads (Correctly done here!)
app.use(express.json())
app.use(cors()) // Apply CORS middleware

// Connect to the database
connectDB() 

// --- GET Routes (Read) ---
app.get('/users', async (req,res)=>{
    try{
        const user = await User.find();
        res.json(user)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get('/grade', async(req,res)=>{
    try{
        let graderesultdisplay = await Grade.find();
        res.json(graderesultdisplay)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

// --- POST Routes (Create) ---
app.post('/grade', async (req,res) =>
{
    try {
        const grade = await Grade.create(req.body)
        res.status(201).json(grade) // Use 201 status for creation
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/users', async(req,res)=>{
    try{
        const adduser = await User.create(req.body)
        res.status(201).json(adduser) // Use 201 status for creation
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

// --- PUT Route (Update) ---
app.put('/grade/:id', async (req,res)=>{
    try{
        // 🛑 CRITICAL FIX: Directly use req.body as the update object
        console.log("Incoming update data:", req.body);
        
        const gradeUpdated = await Grade.findByIdAndUpdate(
            req.params.id,
            req.body, // Use the parsed JSON data directly
            {new:true, runValidators: true} // Added runValidators for good practice
        );

        // Check if the document was found and updated
        if (!gradeUpdated) {
            return res.status(404).json({ message: "Grade document not found with the given ID." });
        }

        res.json(gradeUpdated);

    }
    catch(error){
        // Status 400 is often better for validation/malformed ID errors
        res.status(400).json({
            message: error.message
        });
    }
})

app.delete('/grade/:id', async(req,res) =>{
  try{
  const delateUserById = await Grade.findByIdAndDelete(req.params.id)
  res.json(delateUserById)
  }
  catch(error){
  res.status(500).json({message:error.message})
  }
})
app.listen(3000,()=>{
    console.log('You can use from port 3000')
})