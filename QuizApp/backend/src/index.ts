import express from "express";
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload';
import cors from 'cors'
import userRouter from "./routes/userRoute";
import QuizRouter from "./routes/QuizRouter";
dotenv.config();

const app = express();

//middlewares:---
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

//Routes:---
app.use('/api/v1/user',userRouter);
app.use('/api/v1/quiz',QuizRouter);

app.listen(8080,()=>{
    console.log("listening to port 8080....");
})