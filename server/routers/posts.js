import express  from "express";
import { validationCrearePost } from "../validations/posts.js";
import { authticationUser } from "../middleWare/authMiddleWare.js";
import { createPost, deletePost, getAllPosts, getPostInfo, updatePost } from "../controllers/postController.js";
const postRouter = express.Router();
// postRouter.post('/', validationCrearePost, authticationUser, createPost)
postRouter.route('/:id')
    .get(getPostInfo)
    .put(authticationUser, validationCrearePost, updatePost)
    .delete(authticationUser, deletePost);
postRouter.route('/')
    .get(getAllPosts)
    .post(authticationUser, validationCrearePost, createPost)
export default postRouter;