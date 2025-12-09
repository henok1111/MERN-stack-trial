import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controller/userController.js';

const router = express.Router();
router.post('/create', createUser);
router.get('/all', getAllUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/:id', getUserById);  

export default router;



