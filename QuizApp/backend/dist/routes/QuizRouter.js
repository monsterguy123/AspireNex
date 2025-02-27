"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Middleware_1 = require("../middleware/Middleware");
const QuizController_1 = require("../controller/QuizController");
const QuizAttemptedController_1 = require("../controller/QuizAttemptedController");
const QuizRouter = (0, express_1.Router)();
QuizRouter.post('/createQuiz', Middleware_1.userMiddleware, QuizController_1.CreateQuiz);
QuizRouter.post('/fillQuestions/:quizId', Middleware_1.userMiddleware, QuizController_1.FillQuestions);
QuizRouter.put('/QuizCompleted/:quizId', Middleware_1.userMiddleware, QuizController_1.QuizCreatedCompletely);
QuizRouter.get('/QuizCategories/:category', Middleware_1.userMiddleware, QuizController_1.QuizByCategories);
QuizRouter.get('/ViewQuiz/:quizId', Middleware_1.userMiddleware, QuizController_1.Quiz);
QuizRouter.get('/myQuiz', Middleware_1.userMiddleware, QuizController_1.myQuiz);
QuizRouter.post('/attempt/:quizId', Middleware_1.userMiddleware, QuizAttemptedController_1.MarkingAnswer);
QuizRouter.get('/result/:quizId', Middleware_1.userMiddleware, QuizAttemptedController_1.Result);
QuizRouter.get('/LeaderBoard/:quizId', Middleware_1.userMiddleware, QuizAttemptedController_1.LeaderBoard);
exports.default = QuizRouter;
