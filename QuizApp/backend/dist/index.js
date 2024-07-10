"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const QuizRouter_1 = __importDefault(require("./routes/QuizRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//middlewares:---
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
//Routes:---
app.use('/api/v1/user', userRoute_1.default);
app.use('/api/v1/quiz', QuizRouter_1.default);
app.listen(8080, () => {
    console.log("listening to port 8080....");
});
