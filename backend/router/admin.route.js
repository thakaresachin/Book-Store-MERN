import express from 'express';
import { adminlogin, adminlogout, checkAuth } from '../controller/admin.controller.js';

import { AuthAdmin } from '../middleware/authAdmin.middleware.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminlogin )
adminRouter.get('/is-auth',AuthAdmin, checkAuth )
adminRouter.post('/logout',AuthAdmin, adminlogout )

export default adminRouter;