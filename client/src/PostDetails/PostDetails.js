import { CircularProgress, Divider, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import './Styles.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost} from '../actions/posts';

const PostDetails = () => {
  const {post,posts,isLoading} = useSelector((state)=>state.posts)
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
 
  const openPost=(_id)=>{
    dispatch(getPost(_id));
    navigate(`/posts/id/${id}`)
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  
  if(!post) return <CircularProgress size="7em" />
  const filteredPosts = posts.filter((postone)=>postone._id!==post._id);
  const randomIndex = Math.floor(Math.random() * filteredPosts.length);
  const recommendPosts = filteredPosts[randomIndex];
  return (
         <Paper elevation={6} style={{ padding: '20px', borderRadius: '15px' }}>
            <div className="card">
                <div className="section">
                  <Typography variant="h3" component="h2">{post.title}</Typography>
                  <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                  <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                  <Typography variant="h6">Created by: Krishna Reddy {post.name}</Typography>
                  <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="body1"><strong>Likes - coming soon!</strong></Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="body1"><strong>Login Page - coming soon!</strong></Typography>
                  <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className="imageSection">
                  <img className="media" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
      </div>
      <div className="recomendsection">
          <Typography variant='h6' color='inherit'>You might like this</Typography>
          <Divider/>
          <div className="recomendposts" >
            { recommendPosts && (
                <div onClick={()=>openPost(recommendPosts._id)} key={recommendPosts._id} style={{cursor:"pointer",margin:"20px"}} >
                    <Typography variant='h6' color='inherit'>{recommendPosts.title}</Typography>
                    <Typography variant='subtitle2' color="inherit" >{recommendPosts.name}</Typography>
                    <Typography variant='subtitle2' color='inherit'>{recommendPosts.message}</Typography>
                    <img src={recommendPosts.selectedFile} alt={recommendPosts.title}  height="200px" className="recomandimage" />
                </div>
            ) }
          </div>
      </div>
      </Paper>
    )
};

export default PostDetails;
