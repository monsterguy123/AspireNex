import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

export const uploadImages = async (filePath: string): Promise<string | void> => {
    try {
        const img = await cloudinary.uploader.upload(filePath);
        return img.secure_url;
    } catch (error: any) {
        console.error(error.message);
    }
};
