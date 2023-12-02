import chalk from "chalk";
import Post from "../model/Post.js";

// get All posts
export const getAllPosts = async(req, res) => {
    try{
        const posts = await Post.find().populate("author", "-password").sort({createdAt:-1});
        if(!posts) return res.status(404).send("No posts found");
        return res.status(200).send(posts);
    }catch(err){
        console.log(`${chalk.red.bold("ERROR At GetAllPosts")}`)
    }
}

//get post info
export const getPostInfo = async(req, res) => {
    try{
        const postId = req.params.id;
        const post = await Post.findOne({_id: postId}).populate("author", "-password");
        if(!post) return res.status(404).send("No post found this post");
        return res.status(200).send(post);
    }catch(err){
        console.log(`${chalk.red.bold("ERROR At GetPostInfo")}`)
    }
}
// Create Post
export const createPost = async(req, res) =>{
    try{
        const newPost = new Post({...req.body, author: req.user._id});
        await newPost.save();
        return res.status(201).send(newPost);
    }catch(err){
        res.status(400).send("Unknown Error At Posts");
        console.log(`${chalk.red.bold("Unkown Error at Posts")}, ${err}`)
    }
}

// updatePost 
export const updatePost = async(req, res) => {
    try{
        const {title, content} = req.body;
        const post = await Post.findById(req.params.id);
        const currentUser = req.user._id;

        if(!post) return res.status(404).send("This Post Not Found");
        if(currentUser.toString() != post.author.toString()){
            return res.status(403).send("Denied!. The original author is only allowed to update");
        }
        await Post.findByIdAndUpdate(req.params.id, {title, content});
        return res.status(201).send("Updated successfully");
    }catch(err){
        console.log(`${chalk.red.bold("ERROR AT Update POST")}`);
    }
}

// delete post
export const deletePost = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        const currentUser = req.user._id;
        if(!post) return res.status(404).send("This Post Not Found");

        if(currentUser.toString() != post.author.toString()){
            return res.status(403).send("Denied!. The original author is only allowed to delete");
        }
        await Post.findByIdAndDelete(req.params.id);
        return res.status(201).send("Deleted successfully");
    }catch(err){
        console.log(`${chalk.red.bold("ERROR DELETE POST")}, ${err}`);
    }
}