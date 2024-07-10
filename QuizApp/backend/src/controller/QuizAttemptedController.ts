import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Marking the answer for a question
interface Answer {
    quizQuestionId: string,
    selectedOption: string
}

export const MarkingAnswer = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const answers: Answer[] = req.body;
        let score: number = 0;
        let QuizId = req.params.id;

        // Using a for...of loop to handle asynchronous operations correctly
        for (const item of answers) {
            // Finding the correct answer
            const quizAnswer = await prisma.quizQuestions.findFirst({
                where: { id: item.quizQuestionId },
                select: {
                    answer: true,
                    quizId: true
                }
            });
            
            QuizId = quizAnswer?.quizId || "";

            if (!quizAnswer) {
                return res.status(404).json({ msg: "Quiz question not found" });
            }

            const isCorrect = item.selectedOption === quizAnswer.answer;

            if (isCorrect) {
                score += 10;
            }

            // Filling in the answer
            await prisma.quizAttempted.create({
                data: {
                    userId: userId || "",
                    quizQuestionId: item.quizQuestionId || "",
                    markedAnswer: item.selectedOption || "",
                    isCorrect
                }
            });
        }

        await prisma.leaderBoard.create({
            data:{
                quizId:QuizId,
                userId:userId||"",
                Score:score
            }
        })

        // Returning the response after all operations are completed
        return res.json({ msg: "Successfully attempted the question...", score });

    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
};

//Result of user
export const Result = async (req:Request,res:Response)=>{
    try {
        
        const quizId = req.params.quizId;

        const Result = await prisma.quizAttempted.findMany({
             where:{
                userId:req.userId,
                QuizQuestions:{
                    quizId
                }
             },
             select:{
                markedAnswer:true,
                QuizQuestions:{
                    select:{
                        question:true,
                        options:true,
                        answer:true
                    }
                }
             }
        })

        return res.status(201).json({Result});

    } catch (error:any) {
        return res.status(500).json({msg:error.message})
    }
}

//leader board solving:---
export const LeaderBoard = async(req:Request,res:Response)=>{
    try {
        
        const quizId = req.params.quizId;
        if(!quizId){
             return res.json({msg:"wrong id..."})
        }

        //find the quiz:--
         const Scores = await prisma.leaderBoard.findMany({
            where:{quizId},
            select:{
                Score:true,
                User:{
                    select:{
                        name:true,
                        img:true
                    }
                }
            }
         })

         return res.status(201).json({Scores});

    } catch (error:any) {
        return res.json({msg:error.message});
    }
} 