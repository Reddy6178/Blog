import express from 'express';
import { createPosts, deletePost, getPost, getPosts, getPostsBySearch, updatePost } from '../controllers/posts.js';

const router = express.Router()
router.get('/',getPosts)
router.get('/id/:id', getPost);
router.get('/search',getPostsBySearch)
router.post('/',createPosts)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)

export default router;