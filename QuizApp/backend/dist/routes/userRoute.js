"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const userRouter = (0, express_1.Router)();
userRouter.post('/signUp', userController_1.userSignUp);
userRouter.post('/signIn', userController_1.userSignIn);
exports.default = userRouter;
