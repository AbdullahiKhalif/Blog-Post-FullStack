import dotenv from 'dotenv';
dotenv.config();
export const port = process.env.PORT;
export const dbUrl = process.env.DATABASEURL; 
export const jwtSecret = process.env.JWT_SETCTER;
export const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;