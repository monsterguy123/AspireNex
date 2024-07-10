import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { uploadImages } from "../cloudinary/Cloudinary";
import { UploadedFile } from "express-fileupload";
import fs from 'fs'
import path from 'path'
const prisma = new PrismaClient();

interface Quiz{
   title:string,
   category:string,
   description:string
}

// Ensure the temp directory exists
const ensureTempDirExists = (tempDir: string) => {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
}

//createQuiz controller
export const CreateQuiz = async (req:Request,res:Response)=>{
    try {
        const Quiz:Quiz = req.body;
        
        const file = req.files?.img as UploadedFile;
        if (!file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const tempDir = path.join(__dirname, 'temp');
        ensureTempDirExists(tempDir);

        // Move file to a temporary location
        const tempFilePath = path.join(tempDir, file.name);
        await file.mv(tempFilePath);

        // Upload image to Cloudinary
        const url = await uploadImages(tempFilePath);

        fs.unlinkSync(tempFilePath);

        if (!url) {
            return res.status(500).json({ msg: "Image upload failed" });
        }

        if(!Quiz.title || !Quiz.category){
             return res.json({msg:"missing value in req.body..."})
        }

        const Category = Quiz.category.replace(/\s+/g, '').toLocaleLowerCase();
        //createQuiz
        const quiz = await prisma.quiz.create({
            data:{
                title:Quiz.title||"",
                category:Category||"",
                userId:req.userId||"",
                description:Quiz.description,
                img:url||""
            }
        })

        return res.status(201).json({quizId:quiz.id});

    } catch (error:any) {
        return res.status(500).json({msg:error.message});
    }
}


//Fill the Quizes with Questions:---
interface QuizQuestion{
    question:string,
    options:string[],
    correctAnswer:string
}

export const FillQuestions = async(req:Request,res:Response)=>{
    try {

        const quizQuestion:QuizQuestion = req.body;
        const quizId  = req.params.quizId;


        //filling in questions:--
        await prisma.quizQuestions.create({
            data:{
                question:quizQuestion.question||"",
                options:quizQuestion.options||"",
                answer:quizQuestion.correctAnswer||"",
                quizId:quizId||""
            }
        })

        return res.status(201).json({msg:"question inserted successfully..."})
        
    } catch (error:any) {
        return res.json({msg:error.message});
    }
}

//quiz completion
export const QuizCreatedCompletely = async (req:Request,res:Response)=>{
    try {
        const quizId = req.params.quizId;

        await prisma.quiz.update({
            where:{id:quizId},
            data:{
                Created:true
            }
        })

        return res.status(200).json({msg:"Quiz created successfully..."})
    } catch (error:any) {
        return res.json({msg:error.message})
    }
} 

//find quiz by categories
export const QuizByCategories  = async(req:Request,res:Response)=>{
    try {
        
        let category = req.params.category;
        category = category.toLocaleLowerCase()
        let Quiz;
        Quiz = await prisma.quiz.findMany({
            where:{category:category}
        })

        return res.status(201).json({Quiz});

    } catch (error:any) {
        return res.json({msg:error.message});
    }
}

export const Quiz = async (req: Request, res: Response) => {
    try {
        
        const quizId = req.params.quizId;

        //checking if user already given or not
        const leader = await prisma.leaderBoard.findFirst({
            where:{quizId,userId:req.userId},
            select:{id:true}
        })

        if(leader?.id){
            return res.status(202).json({msg:"already attempted the Quiz..."})
        }

        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            select: {
                title: true,
                question: true,
                id: true,
                userId: true
            }
        });

        if (!quiz) {
            return res.status(404).json({ msg: "Quiz not found" });
        }

        if(quiz.userId === req.userId){
            return res.json({msg:"Your the the creater of the quiz you can't take part in this"});
        }

        return res.status(201).json({ quiz });
    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
};

//myQuiz
export const myQuiz = async(req:Request,res:Response)=>{
    try {
        
        const myQuiz = await prisma.quiz.findMany({
            where:{
                userId:req.userId
            }
        })

        return res.status(201).json({myQuiz})

    } catch (error:any) {
        return res.json({msg:error.message})
    }
}