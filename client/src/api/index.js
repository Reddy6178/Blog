import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:3001"})

export const fetchPosts = (page)=> API.get(`/posts?page=${Number(page)}`)
export const fetchPost = (_id)=> API.get(`/posts/id/${_id}`)
export const fetchPostsBySearch = (searchQuery) =>API.get(`/posts/search?searchQuery=${searchQuery.search ||'none'}`)
export const createPost = (newPost) =>API.post('/posts',newPost)
export const updatePost = (_id,newPost)=>API.patch(`/posts/${_id}`,newPost)
export const deletePost = (_id) =>API.delete(`/posts/${_id}`)
