 const posts= (state={isLoading:true,posts:[],post:null},action)=>{
    switch(action.type){
        case 'ISLOADING':
            return {...state,isLoading:true}
        case 'NOTLOADING':
            return {...state,isLoading:false}
        case 'FETCH_ALL':
            return {
                ...state,
                posts:action.payload.data,
                currentPage:action.payload.currentPage,
                noOfPages:action.payload.noOfPages
            }
        case 'FETCH_POST':
            return {
                ...state,
                post:action.payload
            }
        case 'SEARCH':
            return {...state,posts:action.payload}
        case 'CREATE':
            return {...state,posts:[...state.posts,action.payload]}
        case 'UPDATE':
            return {...state,posts:state.posts.map((post)=>post._id===action.payload._id ? action.payload:post)}
        case 'DELETE':
            return {...state,posts:state.posts.filter((post)=>post._id!==action.payload)}
        default:
            return state
    }
}
export default posts;