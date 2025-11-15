import express from 'express';
import { addBook, getAllBooks } from '../controller/book.controller.js';
import { AuthAdmin } from '../middleware/authAdmin.middleware.js';
import { upload } from '../config/multer.js';

const bookRouter = express.Router();

bookRouter.post('/add',AuthAdmin, upload.single("image") ,addBook )
bookRouter.get('/getAllBooks',getAllBooks )

export default bookRouter;