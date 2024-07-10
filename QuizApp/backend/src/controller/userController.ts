import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { uploadImages } from "../cloudinary/Cloudinary";
import { UploadedFile } from "express-fileupload";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface User {
    name:string,
    email:string,
    password:string,
}

// Ensure the temp directory exists
const ensureTempDirExists = (tempDir: string) => {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
}

// User Registration :---
export const userSignUp = async (req: Request, res: Response) => {
    try {
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

        const { name, email, password}: User = req.body;

        if (!email || !password || !name ) {
            return res.status(400).json({ msg: "Required fields are missing" });
        }

        const existingUser = await prisma.user.findFirst({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(401).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Database Insertion
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                img: url,
            }
        });

        return res.status(201).json({ msg: "User has been created successfully" });
    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
};

//User Sign In:---
export const userSignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Database find user:--
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return res.status(401).json({ msg: "No user exists with this email" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        const token = JWT.sign({ id: existingUser.id }, process.env.JWTPRIVATEKEY || "", {
            expiresIn: '3d'
        });

        return res.status(200).json({ msg: "User signed in successfully", token });
    } catch (error: any) {
        return res.status(500).json({ msg: error.message });
    }
};
