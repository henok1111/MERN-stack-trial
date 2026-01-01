import express from 'express'
import { statusDisplay,insertStatus } from '../controller/status.js'
const statusroute = express.Router()
import validate from '../middleware/validate.js'
import { statusSchema } from '../validation/statusValidation.js'
statusroute.get('/statusdisplay',validate(statusSchema),statusDisplay)
statusroute.get('/insertstatus',validate(statusSchema),insertStatus)
export default statusroute
