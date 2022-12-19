const Post = require('../models/Post');
const User = require('../models/User');


async function createPost(postData){
    const post = new Post(postData);
    await post.save();

    return post;
}
async function getAllPosts(){
    const posts = await Post.find({}).lean();
    return posts;
}

async function getPostById(id){
    const post = await Post.findById(id).lean();
    return post;
}
module.exports = {
    createPost,
    getAllPosts,
    getPostById
}