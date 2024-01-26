import 'dotenv/config';
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import reportRoutes from './routes/reports.js';
import letterRoutes from './routes/letters.js'
import userRoutes from './routes/user.js';
import cookieParser from 'cookie-parser';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



mongoose.connect(`${process.env.DB_CONNECTION}`, { useNewUrlParser: true });
mongoose.connection
    .once("open", () => {
        console.log("Connected to Reference App database");
    })
    .on("error", (error) => {
        console.log("connection error ", error);
    });

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors('*'));


const PORT = process.env.PORT || 5600;

// app.get("/", (req, res, next) => {
//     res.send(`server running at port ${PORT}`);
// });

app.use('/user', userRoutes);
app.use('/reports', reportRoutes);
app.use('/letters', letterRoutes)

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



app.listen(PORT, () => {
    console.log("server listening at port ", PORT);
});