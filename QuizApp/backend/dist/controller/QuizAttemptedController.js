"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderBoard = exports.Result = exports.MarkingAnswer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const MarkingAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const answers = req.body;
        let score = 0;
        let QuizId = req.params.id;
        // Using a for...of loop to handle asynchronous operations correctly
        for (const item of answers) {
            // Finding the correct answer
            const quizAnswer = yield prisma.quizQuestions.findFirst({
                where: { id: item.quizQuestionId },
                select: {
                    answer: true,
                    quizId: true
                }
            });
            QuizId = (quizAnswer === null || quizAnswer === void 0 ? void 0 : quizAnswer.quizId) || "";
            if (!quizAnswer) {
                return res.status(404).json({ msg: "Quiz question not found" });
            }
            const isCorrect = item.selectedOption === quizAnswer.answer;
            if (isCorrect) {
                score += 10;
            }
            // Filling in the answer
            yield prisma.quizAttempted.create({
                data: {
                    userId: userId || "",
                    quizQuestionId: item.quizQuestionId || "",
                    markedAnswer: item.selectedOption || "",
                    isCorrect
                }
            });
        }
        yield prisma.leaderBoard.create({
            data: {
                quizId: QuizId,
                userId: userId || "",
                Score: score
            }
        });
        // Returning the response after all operations are completed
        return res.json({ msg: "Successfully attempted the question...", score });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.MarkingAnswer = MarkingAnswer;
//Result of user
const Result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        const Result = yield prisma.quizAttempted.findMany({
            where: {
                userId: req.userId,
                QuizQuestions: {
                    quizId
                }
            },
            select: {
                markedAnswer: true,
                QuizQuestions: {
                    select: {
                        question: true,
                        options: true,
                        answer: true
                    }
                }
            }
        });
        return res.status(201).json({ Result });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.Result = Result;
//leader board solving:---
const LeaderBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        if (!quizId) {
            return res.json({ msg: "wrong id..." });
        }
        //find the quiz:--
        const Scores = yield prisma.leaderBoard.findMany({
            where: { quizId },
            select: {
                Score: true,
                User: {
                    select: {
                        name: true,
                        img: true
                    }
                }
            }
        });
        return res.status(201).json({ Scores });
    }
    catch (error) {
        return res.json({ msg: error.message });
    }
});
exports.LeaderBoard = LeaderBoard;
