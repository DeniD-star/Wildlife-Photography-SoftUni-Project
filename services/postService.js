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

async function editPost(postId, newData){
    const post = await Post.findById(postId);
    post.title=newData.title,
    post.keyWord=newData.keyWord,
    post.location= newData.location,
    post.date= newData.date,
    post.imageUrl= newData.imageUrl,
    post.description= newData.description

    return post.save()
}

async function deletePost(id){
    return Post.findByIdAndDelete(id);
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    editPost,
    deletePost
}