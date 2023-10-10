import  postMessage  from "../models/postSchema.js"
import mongoose from 'mongoose'

export const getPosts = async(req,res)=>{
    const {page} = req.query
    try {
        const LIMIT =6
        const startIndex = (Number(page)-1)*LIMIT
        const total = await postMessage.countDocuments({})
        
        const Posts = await postMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)

        res.status(202).json({data:Posts,noOfPages:Math.ceil(total/LIMIT),currentPage:Number(page)})
    } catch (error) {
        res.status(404).json(error.message)
    }
}
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await postMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getPostsBySearch = async(req,res)=>{
    const {searchQuery} = req.query
    try {
        const title = new RegExp(searchQuery,'i')
        const message = new RegExp(searchQuery,'i');
        const Posts = await postMessage.find({ $or: [ {title}, {message} ] })


        res.status(202).json({data:Posts})
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const createPosts = async(req,res)=>{
    const post = req.body
    const Post = new postMessage({...post,createdAt:new Date().toISOString()})

    try {
        await Post.save()
        
        res.status(201).json(Post)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const updatePost = async(req,res)=>{
    const {id:_id} = req.params
    const post = req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = await postMessage.findByIdAndUpdate(_id,post,{new:true})

        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = async(req,res) =>{
    const {id} = req.params
    try {
        await postMessage.findByIdAndDelete(id)

        res.status(200).json("successfully deleted")
    } catch (error) {
        console.log(error.message)
    }
}

