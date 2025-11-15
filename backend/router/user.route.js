 import express from 'express';
import { checkAuth, Login, Logout, Signup } from '../controller/user.controller.js';
import { AuthUser } from '../middleware/authuser.middleware.js';

 const userRouter = express.Router();

 userRouter.post('/signup', Signup )
 userRouter.post('/login', Login )
 userRouter.get('/logout',AuthUser, Logout )
 userRouter.get('/is-auth',AuthUser, checkAuth)

 export default userRouter;

