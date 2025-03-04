import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/users.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import postRouter from './routes/posts.route.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.listen(3000, () => {
    console.log("Server is running on localhost:3000");
})