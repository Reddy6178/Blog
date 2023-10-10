import * as api from '../api/index'

export const getPosts = (page)=> async(dispatch)=>{
    try {
        dispatch({type:"ISLOADING"})
        const {data} =await api.fetchPosts(page)

        dispatch({type:'FETCH_ALL',payload:data})
        dispatch({type:"NOTLOADING"})
    } catch (error) {
        console.log(error.message)   
    }
}
export const getPost = (_id)=> async(dispatch)=>{
    try {
        dispatch({type:"ISLOADING"})
        const {data} =await api.fetchPost(_id)

        dispatch({type:'FETCH_POST',payload:data})
        console.log(data)
        
        dispatch({type:"NOTLOADING"})
    } catch (error) {
        console.log(error.message)   
    }
}
export const getPostsBySearch = (searchQuery)=> async(dispatch)=>{
    try {
        dispatch({type:"ISLOADING"})
        const {data:{data}} =await api.fetchPostsBySearch(searchQuery)

        dispatch({type:'SEARCH',payload:data})
        dispatch({type:"NOTLOADING"})
    } catch (error) {
        console.log(error.message)   
    }
}
export const createPost = (post,navigate)=> async(dispatch)=>{
    try {
        dispatch({type:"ISLOADING"})
        const {data} = await api.createPost(post)

        dispatch({type:'CREATE',payload:data})
        console.log(data)
        console.log(data._id)
        navigate(`/posts/id/${data._id}`)
        dispatch({type:"NOTLOADING"})
        
    } catch (error) {
        console.log(error.message)   
    }
}

export const updatePost = (_id,newPost) => async(dispatch) =>{

    try {
        const {data} = await api.updatePost(_id,newPost)

        dispatch({type:"UPDATE",payload:data})
    } catch (error) {
        console.log(error.message)  
    }
}

export const deletePost = (_id) => async(dispatch) =>{

    try {
        await api.deletePost(_id)

        dispatch({type:"DELETE",payload:_id})
    } catch (error) {
        console.log(error.message)  
    }
}
