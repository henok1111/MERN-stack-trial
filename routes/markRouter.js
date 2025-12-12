import { displayMark,createMark } from "../controller/markController.js";
import express from 'express'
const markRouter = express.Router()
markRouter.get('/mark',displayMark);
markRouter.post('/mark',createMark);
export default  markRouter;