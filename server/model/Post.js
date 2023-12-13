import mongoose from "mongoose";
const postShchema = new mongoose.Schema({
    content: {
        type: String,
    },
    image: {
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true,})

const Post = mongoose.model("Posts",postShchema);
export default Post;