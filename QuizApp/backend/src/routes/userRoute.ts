import { Router } from "express";
import { userSignIn, userSignUp } from "../controller/userController";
const userRouter = Router();

userRouter.post('/signUp',userSignUp);
userRouter.post('/signIn',userSignIn);

export default userRouter;