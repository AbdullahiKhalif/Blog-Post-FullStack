import chalk from "chalk";
import Post from "../model/Post.js";
import cloudinary from "../config/cloudinary.js";

// get All posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "-password")
      .sort({ createdAt: -1 });
    if (!posts) return res.status(404).send("No posts found");
    return res.status(200).send(posts);
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR At GetAllPosts")} , ${err.message}`);
  }
};

//get post info
export const getPostInfo = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId }).populate(
      "author",
      "-password"
    );
    if (!post) return res.status(404).send("No post found this post");
    return res.status(200).send(post);
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR At GetPostInfo")}`);
  }
};
// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    let result;
    if (req.file) {
      let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 400, height: 400, crop: "limit" }],
        encoding: "base64",
        folder: "blog-post",
      });
    }
    const newPost = new Post({
      title,
      content,
      image: result?.url || null,
      author: req.user._id,
    });
    await newPost.save();
    return res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send("Unknown Error At Posts");
    console.log(`${chalk.red.bold("Unkown Error at Posts")}, ${err}`);
  }
};

// updatePost
export const updatePost = async(req, res) => {
  try{
      var updatedFelids = {
          content: req.body.content
      }
      const postExists = await Post.findById(req.params.id);
      
      if(!postExists) return res.status(404).send("Not Found This Post");

      const currentUser = req.user._id;

      if(currentUser.toString() != postExists.author.toString()){
          return res.status(403).send("You do not have permission to update this post!");
      }
      let result;


      const isExists = await Post.findById(req.params.id);

      if (!isExists) return res.status(400).send("post not found");


      if (req.file) {

          let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`;

          result = await cloudinary.uploader.upload(encodedImage, {
              resource_type: 'image',
              transformation: [
                  { width: 400, height: 400, crop: "limit" }
              ],
              encoding: 'base64',
              folder: "posts"
          });

          updatedFelids.image = result.url;

      }
      const post = await Post.findByIdAndUpdate(req.params.id, updatedFelids, { new: true });

      return res.status(200).send(post);

  }catch(err){
      console.log(`${chalk.red.bold("ERROR At Update Post")}. ${err}`)
      res.status(400).send(err.message)
  }
}

// delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const currentUser = req.user._id;
    if (!post) return res.status(404).send("This Post Not Found");

    if (currentUser.toString() != post.author.toString()) {
      return res
        .status(403)
        .send("Denied!. The original author is only allowed to delete");
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(201).send("Deleted successfully");
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR DELETE POST")}, ${err}`);
  }
};
