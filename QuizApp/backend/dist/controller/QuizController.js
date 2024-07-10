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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myQuiz = exports.Quiz = exports.QuizByCategories = exports.QuizCreatedCompletely = exports.FillQuestions = exports.CreateQuiz = void 0;
const client_1 = require("@prisma/client");
const Cloudinary_1 = require("../cloudinary/Cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
// Ensure the temp directory exists
const ensureTempDirExists = (tempDir) => {
    if (!fs_1.default.existsSync(tempDir)) {
        fs_1.default.mkdirSync(tempDir, { recursive: true });
    }
};
//createQuiz controller
const CreateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const Quiz = req.body;
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
        if (!file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        const tempDir = path_1.default.join(__dirname, 'temp');
        ensureTempDirExists(tempDir);
        // Move file to a temporary location
        const tempFilePath = path_1.default.join(tempDir, file.name);
        yield file.mv(tempFilePath);
        // Upload image to Cloudinary
        const url = yield (0, Cloudinary_1.uploadImages)(tempFilePath);
        fs_1.default.unlinkSync(tempFilePath);
        if (!url) {
            return res.status(500).json({ msg: "Image upload failed" });
        }
        if (!Quiz.title || !Quiz.category) {
            return res.json({ msg: "missing value in req.body..." });
        }
        const Category = Quiz.category.replace(/\s+/g, '').toLocaleLowerCase();
        //createQuiz
        const quiz = yield prisma.quiz.create({
            data: {
                title: Quiz.title || "",
                category: Category || "",
                userId: req.userId || "",
                description: Quiz.description,
                img: url || ""
            }
        });
        return res.status(201).json({ quizId: quiz.id });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.CreateQuiz = CreateQuiz;
const FillQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizQuestion = req.body;
        const quizId = req.params.quizId;
        //filling in questions:--
        yield prisma.quizQuestions.create({
            data: {
                question: quizQuestion.question || "",
                options: quizQuestion.options || "",
                answer: quizQuestion.correctAnswer || "",
                quizId: quizId || ""
            }
        });
        return res.status(201).json({ msg: "question inserted successfully..." });
    }
    catch (error) {
        return res.json({ msg: error.message });
    }
});
exports.FillQuestions = FillQuestions;
//quiz completion
const QuizCreatedCompletely = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        yield prisma.quiz.update({
            where: { id: quizId },
            data: {
                Created: true
            }
        });
        return res.status(200).json({ msg: "Quiz created successfully..." });
    }
    catch (error) {
        return res.json({ msg: error.message });
    }
});
exports.QuizCreatedCompletely = QuizCreatedCompletely;
//find quiz by categories
const QuizByCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let category = req.params.category;
        category = category.toLocaleLowerCase();
        let Quiz;
        Quiz = yield prisma.quiz.findMany({
            where: { category: category }
        });
        return res.status(201).json({ Quiz });
    }
    catch (error) {
        return res.json({ msg: error.message });
    }
});
exports.QuizByCategories = QuizByCategories;
const Quiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        //checking if user already given or not
        const leader = yield prisma.leaderBoard.findFirst({
            where: { quizId, userId: req.userId },
            select: { id: true }
        });
        if (leader === null || leader === void 0 ? void 0 : leader.id) {
            return res.status(202).json({ msg: "already attempted the Quiz..." });
        }
        const quiz = yield prisma.quiz.findUnique({
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
        if (quiz.userId === req.userId) {
            return res.json({ msg: "Your the the creater of the quiz you can't take part in this" });
        }
        return res.status(201).json({ quiz });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.Quiz = Quiz;
//myQuiz
const myQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myQuiz = yield prisma.quiz.findMany({
            where: {
                userId: req.userId
            }
        });
        return res.status(201).json({ myQuiz });
    }
    catch (error) {
        return res.json({ msg: error.message });
    }
});
exports.myQuiz = myQuiz;
