import { Router } from "express";
import { userMiddleware } from "../middleware/Middleware";
import { CreateQuiz, FillQuestions, Quiz, myQuiz, QuizByCategories, QuizCreatedCompletely} from "../controller/QuizController";
import { LeaderBoard, MarkingAnswer, Result } from "../controller/QuizAttemptedController";
const QuizRouter = Router();

QuizRouter.post('/createQuiz',userMiddleware,CreateQuiz);
QuizRouter.post('/fillQuestions/:quizId',userMiddleware,FillQuestions);
QuizRouter.put('/QuizCompleted/:quizId',userMiddleware,QuizCreatedCompletely);
QuizRouter.get('/QuizCategories/:category',userMiddleware,QuizByCategories);
QuizRouter.get('/ViewQuiz/:quizId',userMiddleware,Quiz);
QuizRouter.get('/myQuiz',userMiddleware,myQuiz);

QuizRouter.post('/attempt/:quizId',userMiddleware,MarkingAnswer);
QuizRouter.get('/result/:quizId',userMiddleware,Result);
QuizRouter.get('/LeaderBoard/:quizId',userMiddleware,LeaderBoard);


export default QuizRouter;
